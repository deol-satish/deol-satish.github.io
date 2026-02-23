import { createContext, useContext, useLayoutEffect, useState, useCallback, type ReactNode } from 'react';

export type ColorTheme = 'light' | 'dark' | 'red' | 'blue' | 'green' | 'yellow';
export type TextureTheme = 'none' | 'dots' | 'grid' | 'spaceships';

const THEME_STORAGE_KEY = 'deol-color-theme';
const TEXTURE_STORAGE_KEY = 'deol-texture';

type ThemeContextValue = {
  colorTheme: ColorTheme;
  texture: TextureTheme;
  setColorTheme: (t: ColorTheme) => void;
  setTexture: (t: TextureTheme) => void;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  toggleSettings: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getStored<K extends string>(key: string, allowed: readonly K[]): K {
  if (typeof window === 'undefined') return allowed[0] as K;
  const stored = localStorage.getItem(key);
  if (stored && allowed.includes(stored as K)) return stored as K;
  return allowed[0] as K;
}

function getInitialColorTheme(): ColorTheme {
  if (typeof document === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  const allowed: ColorTheme[] = ['light', 'dark', 'red', 'blue', 'green', 'yellow'];
  if (stored && allowed.includes(stored as ColorTheme)) return stored as ColorTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTexture(): TextureTheme {
  const allowed: TextureTheme[] = ['none', 'dots', 'grid', 'spaceships'];
  return getStored(TEXTURE_STORAGE_KEY, allowed);
}

function applyTheme(colorTheme: ColorTheme, texture: TextureTheme) {
  const html = document.documentElement;
  html.setAttribute('data-theme', colorTheme);
  html.setAttribute('data-texture', texture);
  html.classList.toggle('dark', colorTheme === 'dark');
  if (colorTheme !== 'dark') html.classList.remove('dark');
  else html.classList.add('dark');
  localStorage.setItem(THEME_STORAGE_KEY, colorTheme);
  localStorage.setItem(TEXTURE_STORAGE_KEY, texture);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(getInitialColorTheme);
  const [texture, setTextureState] = useState<TextureTheme>(getInitialTexture);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useLayoutEffect(() => {
    applyTheme(colorTheme, texture);
  }, [colorTheme, texture]);

  const setColorTheme = useCallback((t: ColorTheme) => {
    setColorThemeState(t);
  }, []);

  const setTexture = useCallback((t: TextureTheme) => {
    setTextureState(t);
  }, []);

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);
  const toggleSettings = useCallback(() => setSettingsOpen((o) => !o), []);

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        texture,
        setColorTheme,
        setTexture,
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
