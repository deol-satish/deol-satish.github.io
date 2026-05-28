import { createContext, useContext, useLayoutEffect, useState, useCallback, type ReactNode } from 'react';

export type ColorTheme = 'light' | 'dark' | 'red' | 'blue' | 'green' | 'yellow' | 'forest';
export type TextureTheme = 'none' | 'dots' | 'grid' | 'spaceships';
export type BackgroundImage = 'none' | 'forest-misty' | 'forest-road' | 'forest-sunrise' | 'forest-light';

const THEME_STORAGE_KEY = 'deol-color-theme';
const TEXTURE_STORAGE_KEY = 'deol-texture';
const BG_IMAGE_STORAGE_KEY = 'deol-bg-image';

type ThemeContextValue = {
  colorTheme: ColorTheme;
  texture: TextureTheme;
  backgroundImage: BackgroundImage;
  setColorTheme: (t: ColorTheme) => void;
  setTexture: (t: TextureTheme) => void;
  setBackgroundImage: (b: BackgroundImage) => void;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  toggleSettings: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const COLOR_VALUES: ColorTheme[] = ['light', 'dark', 'red', 'blue', 'green', 'yellow', 'forest'];
const TEXTURE_VALUES: TextureTheme[] = ['none', 'dots', 'grid', 'spaceships'];
const BG_IMAGE_VALUES: BackgroundImage[] = ['none', 'forest-misty', 'forest-road', 'forest-sunrise', 'forest-light'];

// Backgrounds that visually require a dark UI palette (text legibility).
// Light-friendly images don't appear here and can be paired with any theme.
export const RESTRICTED_BG_IMAGES: BackgroundImage[] = ['forest-misty', 'forest-road', 'forest-sunrise'];

function getStored<K extends string>(key: string, allowed: readonly K[], fallback: K): K {
  if (typeof window === 'undefined') return fallback;
  const stored = localStorage.getItem(key);
  if (stored && allowed.includes(stored as K)) return stored as K;
  return fallback;
}

function getInitialColorTheme(): ColorTheme {
  if (typeof document === 'undefined') return 'forest';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored && COLOR_VALUES.includes(stored as ColorTheme)) return stored as ColorTheme;
  return 'forest';
}

function getInitialTexture(): TextureTheme {
  return getStored(TEXTURE_STORAGE_KEY, TEXTURE_VALUES, 'none');
}

function getInitialBackgroundImage(): BackgroundImage {
  // Default to Sunrise Pines on first visit
  if (typeof window === 'undefined') return 'forest-sunrise';
  const stored = localStorage.getItem(BG_IMAGE_STORAGE_KEY);
  if (stored && BG_IMAGE_VALUES.includes(stored as BackgroundImage)) return stored as BackgroundImage;
  return 'forest-sunrise';
}

function applyTheme(colorTheme: ColorTheme, texture: TextureTheme, bg: BackgroundImage) {
  const html = document.documentElement;
  html.setAttribute('data-theme', colorTheme);
  html.setAttribute('data-texture', texture);
  html.setAttribute('data-bg-image', bg);
  const isDark = colorTheme === 'dark' || colorTheme === 'forest';
  html.classList.toggle('dark', isDark);
  localStorage.setItem(THEME_STORAGE_KEY, colorTheme);
  localStorage.setItem(TEXTURE_STORAGE_KEY, texture);
  localStorage.setItem(BG_IMAGE_STORAGE_KEY, bg);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(getInitialColorTheme);
  const [texture, setTextureState] = useState<TextureTheme>(getInitialTexture);
  const [backgroundImage, setBackgroundImageState] = useState<BackgroundImage>(getInitialBackgroundImage);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useLayoutEffect(() => {
    applyTheme(colorTheme, texture, backgroundImage);
  }, [colorTheme, texture, backgroundImage]);

  const setColorTheme = useCallback((t: ColorTheme) => setColorThemeState(t), []);
  const setTexture = useCallback((t: TextureTheme) => setTextureState(t), []);
  const setBackgroundImage = useCallback((b: BackgroundImage) => setBackgroundImageState(b), []);

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);
  const toggleSettings = useCallback(() => setSettingsOpen((o) => !o), []);

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        texture,
        backgroundImage,
        setColorTheme,
        setTexture,
        setBackgroundImage,
        settingsOpen,
        openSettings,
        closeSettings,
        toggleSettings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
