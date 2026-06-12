'use client';

import React from 'react';
import { Table, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Order, ProductSnapshot, OrderStatus } from '../../../types/order';
import { formatIDR } from '../../../utils/currency';
import { formatDate } from '../../../utils/date';
import { OrderStatusBadge } from '../../ui/order-status-badge';
import Link from 'next/link';

interface OrderTableProps {
  orders: Order[];
  isPending: boolean;
}

export function OrderTable({ orders, isPending }: OrderTableProps) {
  const columns = [
    {
      title: 'ID Pesanan',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <span className="font-mono text-xs font-semibold text-slate-500">
          {id.substring(0, 8)}...
        </span>
      ),
    },
    {
      title: 'Produk',
      dataIndex: 'productSnapshot',
      key: 'product',
      render: (snapshot: ProductSnapshot) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {snapshot?.name || 'Voucher'}
          </span>
          <span className="text-xs text-slate-400">
            {snapshot?.provider} ({snapshot?.denomination})
          </span>
        </div>
      ),
    },
    {
      title: 'Total Harga',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span className="font-bold font-mono text-slate-700 dark:text-slate-300">
          {formatIDR(price)}
        </span>
      ),
    },
    {
      title: 'Tanggal',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatDate(date)}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => <OrderStatusBadge status={status} />,
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_: unknown, record: Order) => (
        <Link href={`/orders/${record.id}`}>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            className="bg-primary text-white dark:bg-primary-dark dark:text-slate-950 border-0 cursor-pointer"
          >
            Detail
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={orders}
      rowKey="id"
      loading={isPending}
      pagination={false}
      className="overflow-hidden rounded-2xl border dark:border-slate-800"
      scroll={{ x: true }}
    />
  );
}
