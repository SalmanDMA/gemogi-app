import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '../lib/query-provider';
import { ThemeProvider } from '../lib/theme-provider';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gemogi - Digital Voucher & Top-Up Marketplace',
  description:
    'Temukan voucher game, streaming, dan pulsa dengan harga terbaik dan pemrosesan instan.',
  keywords: 'voucher, top up, game, streaming, pulsa, gemogi, blueprint',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-brand-bg-light dark:bg-brand-bg-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <QueryProvider>
          <ThemeProvider>
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
