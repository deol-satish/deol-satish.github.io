import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import AppShell from '@/components/app-shell';

export const metadata: Metadata = {
  title: 'Deol Satish — Software Developer',
  description:
    'Personal site of Deol Satish — Software Engineer, AI/ML researcher, and Cybersecurity enthusiast.',
  icons: { icon: '/mainicon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
