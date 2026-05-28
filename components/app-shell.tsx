'use client';

import type { ReactNode } from 'react';
import { useTheme } from './theme-provider';
import Navbar from './navbar';
import AnimatedBackground from './animated-background';
import { cn } from '@/lib/utils';

const TEXTURE_CLASS: Record<string, string> = {
  none: 'texture-none',
  dots: 'texture-dots',
  grid: 'texture-grid',
  spaceships: 'texture-spaceships',
};

export default function AppShell({ children }: { children: ReactNode }) {
  const { texture } = useTheme();
  return (
    <>
      <AnimatedBackground />
      <div className={cn('relative z-10 flex min-h-screen flex-col', TEXTURE_CLASS[texture] ?? 'texture-none')}>
        <Navbar />
        <main className="flex min-h-0 flex-1 flex-col items-center justify-start pb-20">
          <div className="w-full animate-fade-in">{children}</div>
        </main>
      </div>
    </>
  );
}
