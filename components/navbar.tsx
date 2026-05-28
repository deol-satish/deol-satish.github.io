'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, Palette, LayoutGrid, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme, type ColorTheme, type TextureTheme } from './theme-provider';

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
  { id: 'forest', label: 'Forest', bg: '#0a1410' },
];

const textureOptions: { id: TextureTheme; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'dots', label: 'Dots' },
  { id: 'grid', label: 'Grid' },
  { id: 'spaceships', label: 'Stars' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
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
      if (panelRef.current?.contains(target) || settingsButtonRef.current?.contains(target)) return;
      closeSettings();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [settingsOpen, closeSettings]);

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname?.startsWith(to));

  return (
    <header className="relative z-50 flex justify-center px-4 pt-4">
      <div className="theme-nav-bar w-full max-w-5xl overflow-visible rounded-2xl border shadow-xl shadow-black/5 backdrop-blur-xl">
        <nav className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-6" aria-label="Main navigation">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
            style={{ color: 'var(--nav-text)' }}
          >
            <span className="gradient-text">Deol Satish</span>
          </Link>

          <div className="relative flex items-center gap-2">
            <ul className="hidden items-center gap-0.5 md:flex">
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    href={to}
                    className={cn(
                      'theme-nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive(to) && 'active'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  ref={settingsButtonRef}
                  type="button"
                  onClick={toggleSettings}
                  aria-expanded={settingsOpen}
                  aria-haspopup="dialog"
                  aria-label="Settings"
                  className={cn(
                    'theme-nav-link inline-flex size-9 items-center justify-center rounded-lg transition-colors',
                    settingsOpen && 'active'
                  )}
                >
                  <Settings className="size-5" />
                </button>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="theme-nav-link inline-flex size-9 items-center justify-center rounded-lg md:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {settingsOpen && (
            <div
              ref={panelRef}
              role="dialog"
              aria-label="Settings"
              className="absolute right-0 top-full z-[100] mt-2 w-[min(calc(100vw-2rem),22rem)] rounded-xl border border-border/60 bg-card/90 shadow-2xl backdrop-blur-xl animate-fade-in"
            >
              <div className="max-h-[min(60vh,28rem)] overflow-y-auto py-2">
                <section className="px-4 py-2">
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <Palette className="size-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Appearance</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {colorThemes.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setColorTheme(t.id)}
                        title={t.label}
                        className={cn(
                          'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                          colorTheme === t.id
                            ? 'border-foreground ring-1 ring-foreground'
                            : 'border-border/60 hover:border-border'
                        )}
                      >
                        <span
                          className="size-4 shrink-0 rounded-full border border-border/60"
                          style={{ backgroundColor: t.bg }}
                        />
                        {t.label}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="border-t border-border/40 px-4 py-2">
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <LayoutGrid className="size-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Textures</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {textureOptions.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTexture(t.id)}
                        className={cn(
                          'rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                          texture === t.id
                            ? 'border-foreground bg-accent text-accent-foreground'
                            : 'border-border/60 text-muted-foreground hover:bg-accent/40'
                        )}
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
          className={cn(
            'grid overflow-hidden transition-[grid-template-rows] duration-200 md:hidden',
            mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
        >
          <div className="min-h-0">
            <ul className="border-t border-border/40 px-4 py-3">
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    href={to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'theme-nav-link block rounded-lg px-3 py-2.5 text-base font-medium',
                      isActive(to) && 'active'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setMobileOpen(false);
                    toggleSettings();
                  }}
                  className="w-full justify-center"
                  aria-label="Settings"
                >
                  <Settings className="size-5" />
                  Settings
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
