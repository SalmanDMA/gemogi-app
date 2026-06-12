'use client';

import React from 'react';
import {
  GiftOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  FireOutlined,
} from '@ant-design/icons';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-950 via-purple-950 to-slate-950 text-white p-8 sm:p-12 mb-12 shadow-2xl">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-4">
            <ThunderboltOutlined />
            <span>Top-up & Voucher Instan 24/7</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none mb-6">
            Beli Voucher Favoritmu{' '}
            <span className="bg-linear-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Dalam Hitungan Detik.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-indigo-200/80 mb-8 font-light leading-relaxed">
            Dapatkan akses tak terbatas ke game terpopuler, layanan streaming
            premium, dan pulsa dengan harga termurah dan pemrosesan super
            instan.
          </p>

          <div className="grid grid-cols-3 gap-4 border-t border-indigo-500/20 pt-8 max-w-md mx-auto lg:mx-0">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <ThunderboltOutlined className="text-3xl text-purple-400 mb-2" />
              <span className="text-sm font-bold block">Pemrosesan Instan</span>
              <span className="text-xs text-indigo-300/60 font-light">
                Diproses otomatis
              </span>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <SafetyCertificateOutlined className="text-3xl text-purple-400 mb-2" />
              <span className="text-sm font-bold block">100% Aman</span>
              <span className="text-xs text-indigo-300/60 font-light">
                Bergaransi resmi
              </span>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <GiftOutlined className="text-3xl text-purple-400 mb-2" />
              <span className="text-sm font-bold block">Banyak Promo</span>
              <span className="text-xs text-indigo-300/60 font-light">
                Diskon setiap hari
              </span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-full max-w-sm">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl relative transition-transform duration-500 hover:scale-105">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-2xl shadow-lg transform -rotate-12">
              <FireOutlined className="text-white" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-lg">
                G
              </div>
              <div>
                <h4 className="font-bold text-slate-100">Genshin Impact</h4>
                <p className="text-xs text-indigo-300">Genesis Crystals</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-indigo-300">
                <span>Denominasi</span>
                <span>6480 Crystals</span>
              </div>
              <div className="flex justify-between text-xs text-indigo-300">
                <span>Status</span>
                <span className="text-emerald-400 font-semibold">Aktif</span>
              </div>
              <div className="border-t border-white/5 pt-3 flex justify-between items-center mt-4">
                <span className="text-sm text-indigo-200">Harga Terbaik</span>
                <span className="text-lg font-black text-amber-400 font-mono">
                  Rp 1.250.000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
