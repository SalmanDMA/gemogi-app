'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useProductDetail } from '../../../hooks/use-products';
import { ProductDetailCard } from '../../../components/pages/products/product-detail-card';
import { CheckoutModal } from '../../../components/modals/checkout-modal';
import { Skeleton, Card, Alert } from 'antd';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { product, isPending, isError, error } = useProductDetail(id);

  if (isPending) {
    return (
      <div className="py-8">
        <Card className="rounded-3xl p-8 bg-white dark:bg-slate-900 border dark:border-slate-800">
          <Skeleton active avatar paragraph={{ rows: 8 }} />
        </Card>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="py-8">
        <Alert
          message="Produk Tidak Ditemukan"
          description={
            error instanceof Error
              ? error.message
              : 'Detail produk tidak dapat dimuat. Silakan periksa kembali ID produk Anda.'
          }
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="py-4">
      <ProductDetailCard product={product} />
      <CheckoutModal />
    </div>
  );
}
