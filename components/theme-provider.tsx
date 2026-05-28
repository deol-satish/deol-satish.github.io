'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

export type ColorTheme = 'light' | 'dark' | 'red' | 'blue' | 'green' | 'yellow' | 'forest';
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

const COLOR_VALUES: ColorTheme[] = ['light', 'dark', 'red', 'blue', 'green', 'yellow', 'forest'];
const TEXTURE_VALUES: TextureTheme[] = ['none', 'dots', 'grid', 'spaceships'];

function applyTheme(colorTheme: ColorTheme, texture: TextureTheme) {
  const html = document.documentElement;
  html.setAttribute('data-theme', colorTheme);
  html.setAttribute('data-texture', texture);
  const isDark = colorTheme === 'dark' || colorTheme === 'forest';
  html.classList.toggle('dark', isDark);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('dark');
  const [texture, setTextureState] = useState<TextureTheme>('none');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage / system after mount
  useEffect(() => {
    try {
      const storedColor = localStorage.getItem(THEME_STORAGE_KEY) as ColorTheme | null;
      const storedTexture = localStorage.getItem(TEXTURE_STORAGE_KEY) as TextureTheme | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialColor = storedColor && COLOR_VALUES.includes(storedColor)
        ? storedColor
        : prefersDark ? 'dark' : 'light';
      const initialTexture = storedTexture && TEXTURE_VALUES.includes(storedTexture)
        ? storedTexture
        : 'none';
      setColorThemeState(initialColor);
      setTextureState(initialTexture);
      applyTheme(initialColor, initialTexture);
    } catch {
      applyTheme('dark', 'none');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(colorTheme, texture);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, colorTheme);
      localStorage.setItem(TEXTURE_STORAGE_KEY, texture);
    } catch {}
  }, [colorTheme, texture, mounted]);

  const setColorTheme = useCallback((t: ColorTheme) => setColorThemeState(t), []);
  const setTexture = useCallback((t: TextureTheme) => setTextureState(t), []);
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
