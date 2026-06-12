'use client';

import { useState } from 'react';
import { useOrders } from '../../hooks/use-orders';
import { OrderTable } from '../../components/pages/orders/order-table';
import { EmptyState } from '../../components/ui/empty-state';
import { Pagination, Card, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { orders, meta, isPending } = useOrders(page, limit);

  return (
    <div className="py-4 flex flex-col gap-6">
      <div className="mb-2">
        <Link href="/">
          <Button icon={<ArrowLeftOutlined />} type="text">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-inter">
          Pesanan Saya
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Pantau status pemrosesan voucher dan riwayat pembelian Anda
        </p>
      </div>

      {!isPending && orders.length === 0 ? (
        <EmptyState
          title="Belum Ada Pesanan"
          description="Anda belum melakukan transaksi pembelian voucher. Jelajahi katalog kami untuk menemukan penawaran terbaik!"
          buttonText="Jelajahi Katalog"
          buttonLink="/"
        />
      ) : (
        <Card
          className="rounded-3xl border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          styles={{ body: { padding: '24px' } }}
        >
          <OrderTable orders={orders} isPending={isPending} />

          {meta && meta.total > limit && (
            <div className="flex justify-center mt-6">
              <Pagination
                current={page}
                pageSize={limit}
                total={meta.total}
                onChange={setPage}
                showSizeChanger={false}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
