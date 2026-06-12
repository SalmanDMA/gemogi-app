'use client';

import { useState } from 'react';
import { Modal, Button, Card, Descriptions, Alert, message } from 'antd';
import axios from 'axios';
import { ShoppingCartOutlined, LoginOutlined } from '@ant-design/icons';
import { useUIStore } from '../../store/ui.store';
import { useAuth } from '../../hooks/use-auth';
import { useOrders } from '../../hooks/use-orders';
import { formatIDR } from '../../utils/currency';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function CheckoutModal() {
  const { checkoutModalOpen, selectedProduct, closeCheckout } = useUIStore();
  const { isAuthenticated } = useAuth();
  const { createOrder } = useOrders();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!selectedProduct) return null;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const result = await createOrder({ productId: selectedProduct.id });
      message.success('Pesanan berhasil dibuat!');
      closeCheckout();
      router.push(`/orders/${result.id}`);
    } catch (err) {
      let errMsg = 'Gagal membuat pesanan';
      if (axios.isAxiosError(err)) {
        errMsg = err.response?.data?.message ?? errMsg;
      }
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={checkoutModalOpen}
      centered
      title={
        <div className="flex items-center gap-2 border-b pb-3 text-lg font-bold text-slate-800 dark:text-slate-200 dark:border-slate-800">
          <ShoppingCartOutlined className="text-primary dark:text-primary-dark" />
          <span>Konfirmasi Pembelian</span>
        </div>
      }
      onCancel={closeCheckout}
      footer={[
        <Button key="cancel" onClick={closeCheckout} disabled={loading}>
          Batal
        </Button>,
        isAuthenticated ? (
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleCheckout}
            className="bg-primary text-white dark:bg-primary-dark dark:text-slate-950 border-0"
          >
            Beli Sekarang
          </Button>
        ) : (
          <Link
            href={`/login?redirectTo=/products/${selectedProduct.id}`}
            key="login"
          >
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={closeCheckout}
              className="bg-primary text-white dark:bg-primary-dark dark:text-slate-950 border-0"
            >
              Masuk untuk Membeli
            </Button>
          </Link>
        ),
      ]}
      destroyOnClose
    >
      <div className="py-4 flex flex-col gap-4">
        {!isAuthenticated && (
          <Alert
            message="Autentikasi Diperlukan"
            description="Anda harus masuk terlebih dahulu sebelum dapat melakukan transaksi pembelian."
            type="warning"
            showIcon
          />
        )}

        <Card
          size="small"
          className="bg-slate-50 dark:bg-slate-900 border dark:border-slate-800"
        >
          <h4 className="font-bold text-base text-slate-800 dark:text-slate-200 mb-2">
            {selectedProduct.name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            {selectedProduct.description || 'Voucher digital instan'}
          </p>

          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item label="Provider">
              <span className="font-semibold">{selectedProduct.provider}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Kategori">
              <span className="capitalize">
                {selectedProduct.category.replace('_', ' ')}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Denominasi">
              <span className="font-mono">{selectedProduct.denomination}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Harga">
              <span className="text-lg font-black text-primary dark:text-primary-dark">
                {formatIDR(selectedProduct.price)}
              </span>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          *Setelah pembayaran dikonfirmasi, voucher akan diproses secara instan
          oleh sistem antrean kami. Status pesanan dapat dipantau di halaman
          pesanan.
        </p>
      </div>
    </Modal>
  );
}
