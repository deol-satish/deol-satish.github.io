import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import type { ColorTheme, TextureTheme } from '../contexts/ThemeContext';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Publications', to: '/publications' },
  { label: 'Notes', to: '/notes' },
  { label: 'Finance', to: '/finance' },
] as const;

const colorThemes: { id: ColorTheme; label: string; bg: string }[] = [
  { id: 'light', label: 'Light', bg: '#fafafa' },
  { id: 'dark', label: 'Dark', bg: '#09090b' },
  { id: 'red', label: 'Red', bg: '#fef2f2' },
  { id: 'blue', label: 'Blue', bg: '#eff6ff' },
  { id: 'green', label: 'Green', bg: '#f0fdf4' },
  { id: 'yellow', label: 'Yellow', bg: '#fefce8' },
];

const textureOptions: { id: TextureTheme; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'dots', label: 'Dots' },
  { id: 'grid', label: 'Grid' },
  { id: 'spaceships', label: 'Stars' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    colorTheme,
    texture,
    setColorTheme,
    setTexture,
    settingsOpen,
    closeSettings,
    toggleSettings,
  } = useTheme();

  useEffect(() => {
    if (!settingsOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        panelRef.current?.contains(e.target as Node) ||
        buttonRef.current?.contains(e.target as Node)
      ) return;
      closeSettings();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [settingsOpen, closeSettings]);

  return (
    <header className="relative z-50 flex justify-center px-4 pt-4">
      <div className="theme-nav-bar w-full max-w-5xl overflow-visible rounded-2xl border-2 shadow-md backdrop-blur-sm dark:shadow-lg dark:shadow-black/20">
        <nav
          className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-2">
            <button
              ref={buttonRef}
              type="button"
              onClick={toggleSettings}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/80 ring-1 ring-zinc-200 shadow-sm hover:bg-white dark:bg-zinc-800/80 dark:ring-zinc-600 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Theme and settings"
              aria-expanded={settingsOpen}
              aria-haspopup="dialog"
            >
              <svg className="size-4 text-zinc-600 dark:text-zinc-400" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
            <Link
              to="/"
              className="text-lg font-semibold transition-colors theme-nav-link hover:!bg-transparent"
              style={{ color: 'var(--nav-text)' }}
            >
              Deol Satish
            </Link>
          </div>

          {settingsOpen && (
            <div
              ref={panelRef}
              role="dialog"
              aria-label="Theme settings"
              className="absolute left-4 right-4 top-full z-[100] mt-2 max-w-md rounded-xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-600 dark:bg-zinc-800 sm:left-6 sm:right-auto"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Theme &amp; appearance</h3>
                <button
                  type="button"
                  onClick={closeSettings}
                  className="rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
                  aria-label="Close settings"
                >
                  <svg className="size-4" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Color theme
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {colorThemes.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setColorTheme(t.id)}
                        className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors ${
                          colorTheme === t.id
                            ? 'border-zinc-900 ring-1 ring-zinc-900 dark:border-zinc-300 dark:ring-zinc-300'
                            : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-600 dark:hover:border-zinc-500'
                        }`}
                        title={t.label}
                      >
                        <span
                          className="size-4 shrink-0 rounded-full border border-zinc-300 dark:border-zinc-500"
                          style={{ backgroundColor: t.bg }}
                        />
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Background texture
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {textureOptions.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTexture(t.id)}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          texture === t.id
                            ? 'border-zinc-900 bg-zinc-100 text-zinc-900 dark:border-zinc-300 dark:bg-zinc-700 dark:text-white'
                            : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-0.5 md:flex">
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `theme-nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'active' : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="theme-nav-link inline-flex size-9 items-center justify-center rounded-lg md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="size-6" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          className={`grid overflow-hidden transition-[grid-template-rows] duration-200 md:hidden ${mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="min-h-0">
            <ul className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-700" style={{ borderColor: 'var(--nav-border)' }}>
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `theme-nav-link block rounded-lg px-3 py-2.5 text-base font-medium ${isActive ? 'active' : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
