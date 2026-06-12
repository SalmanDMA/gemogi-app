'use client';

import { Button, Skeleton, Card } from 'antd';
import { ProductCard } from './product-card';
import { EmptyState } from '../../ui/empty-state';
import { Product } from '../../../types/product';

interface ProductGridProps {
  products: Product[];
  total: number;
  isPending: boolean;
  onLoadMore: () => void;
  onShowLess: () => void;
  onEdit?: (product: Product) => void;
}

export function ProductGrid({
  products,
  total,
  isPending,
  onLoadMore,
  onShowLess,
  onEdit,
}: ProductGridProps) {
  if (isPending && products.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card
            key={i}
            className="rounded-2xl border dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="Voucher Tidak Ditemukan"
        description="Maaf, kami tidak menemukan voucher yang cocok dengan kriteria pencarian Anda. Silakan coba kata kunci lain."
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onEdit={onEdit} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6 mb-8">
        {products.length < total && (
          <Button
            type="primary"
            size="large"
            onClick={onLoadMore}
            loading={isPending}
            className="bg-primary text-white dark:bg-primary-dark dark:text-slate-950 border-0 font-semibold px-6"
            style={{ borderRadius: 10, height: 44 }}
          >
            Muat Lebih Banyak
          </Button>
        )}

        {products.length > 8 && (
          <Button
            size="large"
            onClick={onShowLess}
            className="font-semibold px-6"
            style={{ borderRadius: 10, height: 44 }}
          >
            Tampilkan Lebih Sedikit
          </Button>
        )}
      </div>
    </div>
  );
}
