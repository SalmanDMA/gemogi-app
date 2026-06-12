'use client';

import React, { useState } from 'react';
import { HeroSection } from '../components/pages/home/hero-section';
import { FilterBar } from '../components/pages/home/filter-bar';
import { ProductGrid } from '../components/pages/home/product-grid';
import { CheckoutModal } from '../components/modals/checkout-modal';
import { ProductModal } from '../components/modals/product-modal';
import { useProducts } from '../hooks/use-products';
import { useDebounce } from '../hooks/use-debounce';
import { useAuth } from '../hooks/use-auth';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Product } from '../types/product';

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState(8);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { user } = useAuth();
  const debouncedSearch = useDebounce(search, 500);

  const { products, meta, isPending } = useProducts({
    search: debouncedSearch || undefined,
    category: category || undefined,
    page: 1,
    limit,
    includeInactive: user?.role === 'ADMIN' ? 'true' : undefined,
  });

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setLimit(8);
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setLimit(8);
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 8);
  };

  const handleShowLess = () => {
    setLimit(8);
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="py-2">
      <HeroSection />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex-1">
          <FilterBar
            search={search}
            category={category}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        {user?.role === 'ADMIN' && (
          <div className="md:mb-8 self-end md:self-auto">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleCreateProduct}
              className="bg-primary text-white dark:bg-primary-dark dark:text-slate-950 border-0 font-bold px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
              style={{ height: 48 }}
            >
              Tambah Produk Baru
            </Button>
          </div>
        )}
      </div>

      <ProductGrid
        products={products}
        total={meta?.total ?? 0}
        isPending={isPending}
        onLoadMore={handleLoadMore}
        onShowLess={handleShowLess}
        onEdit={handleEditProduct}
      />

      <CheckoutModal />

      <ProductModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
