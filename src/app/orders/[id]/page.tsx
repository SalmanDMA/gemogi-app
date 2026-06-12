'use client';

import { useParams } from 'next/navigation';
import { useOrderDetail } from '../../../hooks/use-orders';
import { VoucherCard } from '../../../components/pages/orders/voucher-card';
import { OrderStatusBadge } from '../../../components/ui/order-status-badge';
import { Card, Button, Descriptions, Alert, Skeleton } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { formatIDR } from '../../../utils/currency';
import { formatDate } from '../../../utils/date';
import Link from 'next/link';

export default function OrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { order, isPending, isError, error } = useOrderDetail(id);

  if (isPending) {
    return (
      <div className="py-8">
        <Card className="rounded-3xl p-8 bg-white dark:bg-slate-900 border dark:border-slate-800">
          <Skeleton active paragraph={{ rows: 6 }} />
        </Card>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="py-8">
        <Alert
          message="Pesanan Tidak Ditemukan"
          description={
            error instanceof Error
              ? error.message
              : 'Detail pesanan tidak dapat dimuat. Silakan periksa kembali ID transaksi Anda.'
          }
          type="error"
          showIcon
        />
      </div>
    );
  }

  const snapshot = order.productSnapshot;

  return (
    <div className="py-4 flex flex-col gap-6">
      <div className="mb-2">
        <Link href="/orders">
          <Button icon={<ArrowLeftOutlined />} type="text">
            Kembali ke Daftar Pesanan
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card
            className="rounded-3xl bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-sm"
            title={
              <div className="flex items-center justify-between py-2">
                <span className="font-bold text-lg text-slate-800 dark:text-slate-200">
                  Rincian Transaksi
                </span>
                <OrderStatusBadge status={order.status} />
              </div>
            }
            styles={{ body: { padding: '24px' } }}
          >
            <Descriptions
              column={1}
              bordered
              size="middle"
              className="overflow-hidden rounded-xl border dark:border-slate-800"
            >
              <Descriptions.Item label="ID Pesanan">
                <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {order.id}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Nama Produk">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {snapshot?.name}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Kategori & Provider">
                <span className="capitalize text-slate-700 dark:text-slate-300">
                  {snapshot?.provider} ({snapshot?.category.replace('_', ' ')})
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Denominasi">
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  {snapshot?.denomination}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Tanggal Pembelian">
                <span className="text-slate-600 dark:text-slate-400">
                  {formatDate(order.createdAt)}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Total Pembayaran">
                <span className="text-xl font-black text-primary dark:text-primary-dark font-mono">
                  {formatIDR(order.price)}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <VoucherCard order={order} />
        </div>
      </div>
    </div>
  );
}
