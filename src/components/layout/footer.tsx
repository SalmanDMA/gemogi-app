'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-white py-8 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <span className="text-lg font-black tracking-wider gradient-text font-inter">
              GEMOGI
            </span>
            <p className="text-center sm:text-left text-xs text-slate-500 dark:text-slate-400">
              Digital Voucher & Top-Up Marketplace terbaik, aman, dan instan.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="/orders"
              className="hover:text-primary transition-colors"
            >
              Pesanan
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
        <hr className="my-6 border-slate-200 dark:border-slate-800" />
        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          &copy; {new Date().getFullYear()} Gemogi Commerce. Hak Cipta
          Dilindungi Undang-Undang.
        </p>
      </div>
    </footer>
  );
}
