'use client';

import React from 'react';
import { Card, Button, message, Alert, Tooltip } from 'antd';
import {
  CopyOutlined,
  CheckOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined,
  SyncOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Order } from '../../../types/order';
import { formatVoucherCode } from '../../../utils/voucher';

interface VoucherCardProps {
  order: Order;
}

export function VoucherCard({ order }: VoucherCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (order.voucherCode) {
      navigator.clipboard.writeText(order.voucherCode);
      setCopied(true);
      message.success('Kode voucher disalin!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (order.status === 'PENDING' || order.status === 'PROCESSING') {
    return (
      <Card className="border border-amber-300 bg-amber-50/20 dark:bg-amber-950/10 dark:border-amber-800 rounded-3xl p-6 text-center shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center text-xl">
            <SyncOutlined spin />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Voucher Sedang Diproses
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Sistem antrean kami sedang memvalidasi pembayaran dan memproduksi
              kode voucher Anda. Mohon tunggu beberapa detik...
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (order.status === 'FAILED') {
    return (
      <Card className="border border-red-300 bg-red-50/20 dark:bg-red-950/10 dark:border-red-800 rounded-3xl p-6 text-center shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center text-xl">
            <WarningOutlined />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Transaksi Gagal
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Maaf, pemrosesan pesanan Anda gagal. Silakan hubungi dukungan
              pelanggan kami untuk bantuan lebih lanjut.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-emerald-300 bg-emerald-50/10 dark:bg-emerald-950/10 dark:border-emerald-800 rounded-3xl p-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider flex items-center gap-1">
        <ThunderboltOutlined /> Ready to Use
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs text-slate-400 dark:text-slate-500 block mb-1">
            KODE VOUCHER ANDA
          </span>
          <div className="flex gap-2 items-center">
            <span className="text-2xl font-black font-mono tracking-widest text-emerald-600 dark:text-emerald-400">
              {formatVoucherCode(order.voucherCode)}
            </span>
            <Tooltip title={copied ? 'Disalin!' : 'Salin Kode'}>
              <Button
                type="text"
                shape="circle"
                icon={
                  copied ? (
                    <CheckOutlined className="text-emerald-500" />
                  ) : (
                    <CopyOutlined />
                  )
                }
                onClick={handleCopy}
                className="hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              />
            </Tooltip>
          </div>
        </div>

        <Alert
          message={
            <div className="text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
              <InfoCircleOutlined />
              <span>
                Gunakan kode voucher ini pada platform provider yang
                bersangkutan.
              </span>
            </div>
          }
          type="success"
          className="border-0 bg-emerald-500/10"
        />
      </div>
    </Card>
  );
}
