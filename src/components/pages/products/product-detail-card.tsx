'use client';

import React from 'react';
import { Button, Descriptions, Tag } from 'antd';
import {
  ShoppingCartOutlined,
  ArrowLeftOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  PlaySquareOutlined,
  PhoneOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { Product } from '../../../types/product';
import { formatIDR } from '../../../utils/currency';
import { useUIStore } from '../../../store/ui.store';
import Link from 'next/link';

interface ProductDetailCardProps {
  product: Product;
}

export function ProductDetailCard({ product }: ProductDetailCardProps) {
  const { openCheckout } = useUIStore();

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'game':
        return <RocketOutlined />;
      case 'streaming':
        return <PlaySquareOutlined />;
      case 'phone_credit':
        return <PhoneOutlined />;
      default:
        return <InboxOutlined />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <Link href="/">
          <Button icon={<ArrowLeftOutlined />} type="text">
            Kembali ke Katalog
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 w-full aspect-square lg:aspect-auto lg:h-full rounded-3xl bg-linear-to-tr from-primary via-indigo-900 to-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden shadow-lg p-8">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
          <div className="text-8xl mb-4">
            {getCategoryIcon(product.category)}
          </div>
          <h2 className="text-3xl font-black tracking-wider text-center uppercase font-inter">
            {product.provider}
          </h2>
          <span className="text-sm text-indigo-300 font-light mt-1">
            Official Voucher Partner
          </span>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border dark:border-slate-800 p-8 rounded-3xl shadow-sm flex flex-col gap-6">
          <div>
            <div className="flex gap-2 items-center mb-2">
              <Tag
                color="purple"
                className="capitalize m-0 font-semibold px-2.5 py-0.5 rounded-md"
              >
                {product.category.replace('_', ' ')}
              </Tag>
              <Tag
                color="cyan"
                className="m-0 font-semibold px-2.5 py-0.5 rounded-md font-mono"
              >
                {product.denomination}
              </Tag>
            </div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 font-inter">
              {product.name}
            </h1>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border dark:border-slate-800">
            {product.description ||
              'Nikmati layanan premium dari mitra resmi kami. Transaksi diproses 100% otomatis, aman, dan instan langsung ke alamat email Anda.'}
          </p>

          <Descriptions
            column={1}
            bordered
            size="middle"
            className="overflow-hidden rounded-xl border dark:border-slate-800"
          >
            <Descriptions.Item label="Provider">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {product.provider}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Denominasi / Nominal">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {product.denomination}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Kategori Layanan">
              <span className="capitalize text-slate-800 dark:text-slate-200">
                {product.category.replace('_', ' ')}
              </span>
            </Descriptions.Item>
          </Descriptions>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t dark:border-slate-800 pt-6 mt-2">
            <div>
              <span className="text-xs text-slate-400 block mb-1">
                Harga Total
              </span>
              <span className="text-3xl font-black text-primary dark:text-primary-dark font-mono">
                {formatIDR(product.price)}
              </span>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={() => openCheckout(product)}
              className="bg-primary text-white dark:bg-primary-dark dark:text-slate-950 border-0 h-14 px-8 font-bold text-base rounded-2xl shadow-lg cursor-pointer"
            >
              Beli Sekarang
            </Button>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 dark:text-slate-500 border-t dark:border-slate-800 pt-4 mt-2">
            <span className="flex items-center gap-1">
              <ThunderboltOutlined className="text-amber-500" />
              Proses Instan 2-3 Detik
            </span>
            <span className="flex items-center gap-1">
              <SafetyCertificateOutlined className="text-emerald-500" />
              100% Garansi Pembelian
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
