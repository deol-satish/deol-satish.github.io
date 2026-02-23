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
const SETTINGS_LABEL = 'Settings';

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
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const mobileSettingsButtonRef = useRef<HTMLButtonElement>(null);
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
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        settingsButtonRef.current?.contains(target) ||
        mobileSettingsButtonRef.current?.contains(target)
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
          className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-6"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-lg font-semibold transition-colors theme-nav-link hover:!bg-transparent"
              style={{ color: 'var(--nav-text)' }}
            >
              Deol Satish
            </Link>
          </div>

          <div className="relative flex items-center gap-2">
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
              <li>
                <button
                  ref={settingsButtonRef}
                  type="button"
                  onClick={toggleSettings}
                  aria-expanded={settingsOpen}
                  aria-haspopup="dialog"
                  aria-label={SETTINGS_LABEL}
                  className={`theme-nav-link inline-flex size-9 items-center justify-center rounded-lg px-2 py-2 text-sm font-medium transition-colors ${settingsOpen ? 'active' : ''}`}
                >
                  <svg className="size-5" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.213-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </button>
              </li>
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

          {settingsOpen && (
            <div
              ref={panelRef}
              role="dialog"
              aria-label={SETTINGS_LABEL}
              className="absolute right-0 top-full z-[100] mt-2 w-[min(calc(100vw-2rem),20rem)] rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-600 dark:bg-zinc-800"
            >
              <div className="max-h-[min(60vh,24rem)] overflow-y-auto py-2 pt-2">
                <section className="px-4 py-2">
                        <div className="mb-2 flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                          <svg className="size-4 shrink-0" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l4.598-4.598M4.098 19.902A3.75 3.75 0 0 1 12 16.5m8.25-4.5a3.75 3.75 0 0 1-3.75 3.75H15a.75.75 0 0 1-.53-.22l-4.598-4.598a3.75 3.75 0 0 1 0-5.304 3.75 3.75 0 0 1 5.304 0L15 7.94m-3-3 2.25 2.25m-7.5 0 7.5 7.5" />
                          </svg>
                          <span className="text-xs font-medium uppercase tracking-wide">Appearance</span>
                        </div>
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
                      </section>

                      <section className="border-t border-zinc-100 px-4 py-2 dark:border-zinc-700">
                        <div className="mb-2 flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                          <svg className="size-4 shrink-0" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                          </svg>
                          <span className="text-xs font-medium uppercase tracking-wide">Background</span>
                        </div>
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
                      </section>
              </div>
            </div>
          )}
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
              <li>
                <button
                  ref={mobileSettingsButtonRef}
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    toggleSettings();
                  }}
                  aria-label={SETTINGS_LABEL}
                  className={`theme-nav-link flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium ${settingsOpen ? 'active' : ''}`}
                >
                  <svg className="size-5" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.213-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
