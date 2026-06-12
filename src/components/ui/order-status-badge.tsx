import { Tag } from 'antd';
import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { OrderStatus } from '../../types/order';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  switch (status) {
    case 'PENDING':
      return (
        <Tag
          icon={<ClockCircleOutlined />}
          color="warning"
          className="px-2.5 py-0.5 text-xs font-semibold rounded-full border border-amber-300 dark:border-amber-700"
        >
          Tertunda
        </Tag>
      );
    case 'PROCESSING':
      return (
        <Tag
          icon={<SyncOutlined spin />}
          color="processing"
          className="px-2.5 py-0.5 text-xs font-semibold rounded-full border border-blue-300 dark:border-blue-700 animate-pulse"
        >
          Diproses
        </Tag>
      );
    case 'SUCCESS':
      return (
        <Tag
          icon={<CheckCircleOutlined />}
          color="success"
          className="px-2.5 py-0.5 text-xs font-semibold rounded-full border border-emerald-300 dark:border-emerald-700"
        >
          Sukses
        </Tag>
      );
    case 'FAILED':
      return (
        <Tag
          icon={<CloseCircleOutlined />}
          color="error"
          className="px-2.5 py-0.5 text-xs font-semibold rounded-full border border-rose-300 dark:border-rose-700"
        >
          Gagal
        </Tag>
      );
    default:
      return (
        <Tag
          color="default"
          className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
        >
          {status}
        </Tag>
      );
  }
}
