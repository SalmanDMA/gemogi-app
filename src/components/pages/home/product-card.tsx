'use client';

import { Card, Button, Tag, Switch, message } from 'antd';
import {
  ShoppingCartOutlined,
  RightOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Product } from '../../../types/product';
import { formatIDR } from '../../../utils/currency';
import { useUIStore } from '../../../store/ui.store';
import { useAuth } from '../../../hooks/use-auth';
import { useUpdateProduct } from '../../../hooks/use-products';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  const { openCheckout } = useUIStore();
  const { user } = useAuth();
  const updateProduct = useUpdateProduct();

  const handleToggleActive = async (checked: boolean) => {
    try {
      await updateProduct.mutateAsync({
        id: product.id,
        data: { isActive: checked },
      });
      message.success(
        `Voucher berhasil ${checked ? 'diaktifkan' : 'dinonaktifkan'}!`,
      );
    } catch {
      message.error('Gagal memperbarui status produk');
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'game':
        return 'magenta';
      case 'streaming':
        return 'purple';
      case 'phone_credit':
        return 'blue';
      default:
        return 'default';
    }
  };

  return (
    <Card
      hoverable
      className={`flex flex-col h-full bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md animate-fade-in-up ${
        !product.isActive
          ? 'opacity-65 border-dashed border-slate-300 dark:border-slate-700'
          : ''
      }`}
      styles={{
        body: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '20px',
        },
      }}
    >
      <div className="flex-1">
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            {product.provider}
          </span>
          <Tag
            color={getCategoryColor(product.category)}
            className="capitalize m-0 font-semibold px-2 py-0.5 rounded-md"
          >
            {product.category.replace('_', ' ')}
          </Tag>
        </div>

        <h3
          className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-1 mb-1"
          title={product.name}
        >
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 min-h-10 mb-4">
          {product.description ||
            'Voucher digital berkualitas untuk kebutuhan hiburan dan komunikasi Anda.'}
        </p>

        <div className="bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border dark:border-slate-800 mb-6 flex justify-between items-center">
          <span className="text-xs text-slate-400">Denominasi:</span>
          <span className="text-sm font-bold font-mono text-slate-700 dark:text-slate-300">
            {product.denomination}
          </span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-xs text-slate-400">Harga:</span>
          <span className="text-xl font-black text-primary dark:text-primary-dark font-mono">
            {formatIDR(product.price)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Link href={`/products/${product.id}`} className="w-full">
              <Button
                size="middle"
                block
                icon={<RightOutlined />}
                style={{ borderRadius: 8 }}
              >
                Detail
              </Button>
            </Link>
            <Button
              type="primary"
              size="middle"
              icon={<ShoppingCartOutlined />}
              onClick={() => openCheckout(product)}
              className="bg-primary text-white dark:bg-primary-dark dark:text-slate-950 border-0"
              style={{ borderRadius: 8 }}
            >
              Beli
            </Button>
          </div>
          {user?.role === 'ADMIN' && onEdit && (
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1">
                <Button
                  size="middle"
                  block
                  icon={<EditOutlined />}
                  onClick={() => onEdit(product)}
                  className="w-full border-indigo-200 dark:border-indigo-900 text-primary dark:text-primary-dark font-semibold"
                  style={{ borderRadius: 8 }}
                >
                  Edit Produk
                </Button>
              </div>
              <div className="flex items-center gap-1.5 border dark:border-slate-800 rounded-lg px-2.5 py-1.5 bg-slate-50 dark:bg-slate-950/40">
                <span className="text-xs font-semibold text-slate-400">
                  Aktif:
                </span>
                <Switch
                  checked={product.isActive}
                  loading={updateProduct.isPending}
                  onChange={handleToggleActive}
                  size="small"
                  className="scale-90"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
