'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  message,
} from 'antd';
import { useCreateProduct, useUpdateProduct } from '../../hooks/use-products';
import { Product } from '../../types/product';

const productSchema = z.object({
  name: z
    .string()
    .min(3, 'Nama minimal 3 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  category: z.enum(['game', 'streaming', 'phone_credit']),
  provider: z.string().min(2, 'Provider minimal 2 karakter'),
  price: z.number().min(0, 'Harga tidak boleh negatif'),
  denomination: z.string().min(1, 'Denominasi minimal 1 karakter'),
  description: z.string().optional().or(z.literal('')),
  isActive: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductModalProps {
  open: boolean;
  onCancel: () => void;
  product: Product | null;
}

export function ProductModal({ open, onCancel, product }: ProductModalProps) {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: 'game',
      provider: '',
      price: 0,
      denomination: '',
      description: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (open) {
      if (product) {
        reset({
          name: product.name,
          category: product.category,
          provider: product.provider,
          price: Number(product.price),
          denomination: product.denomination,
          description: product.description || '',
          isActive: product.isActive,
        });
      } else {
        reset({
          name: '',
          category: 'game',
          provider: '',
          price: 0,
          denomination: '',
          description: '',
          isActive: true,
        });
      }
    }
  }, [product, open, reset]);

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (product) {
        await updateProduct.mutateAsync({
          id: product.id,
          data: values,
        });
        message.success('Produk berhasil diperbarui!');
      } else {
        await createProduct.mutateAsync(values);
        message.success('Produk baru berhasil ditambahkan!');
      }
      onCancel();
    } catch {
      message.error(
        product ? 'Gagal memperbarui produk' : 'Gagal menambahkan produk',
      );
    }
  };

  const isSaving = createProduct.isPending || updateProduct.isPending;

  return (
    <Modal
      open={open}
      title={
        <span className="text-xl font-extrabold text-slate-800 dark:text-slate-100 font-inter">
          {product ? 'Edit Informasi Produk' : 'Tambah Produk Baru'}
        </span>
      }
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      centered
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        requiredMark={false}
        className="mt-4"
      >
        <Form.Item
          label={
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Nama Produk
            </span>
          }
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Contoh: Mobile Legends 86 Diamonds"
                size="large"
              />
            )}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Provider
              </span>
            }
            validateStatus={errors.provider ? 'error' : ''}
            help={errors.provider?.message}
          >
            <Controller
              name="provider"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Contoh: Mobile Legends"
                  size="large"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Kategori
              </span>
            }
            validateStatus={errors.category ? 'error' : ''}
            help={errors.category?.message}
          >
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  size="large"
                  placeholder="Pilih Kategori"
                  options={[
                    { value: 'game', label: 'Game' },
                    { value: 'streaming', label: 'Streaming' },
                    { value: 'phone_credit', label: 'Pulsa & Data' },
                  ]}
                />
              )}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Denominasi
              </span>
            }
            validateStatus={errors.denomination ? 'error' : ''}
            help={errors.denomination?.message}
          >
            <Controller
              name="denomination"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Contoh: 86 Diamonds / Rp 50.000"
                  size="large"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Harga (Rp)
              </span>
            }
            validateStatus={errors.price ? 'error' : ''}
            help={errors.price?.message}
            className="w-full"
          >
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  className="w-full"
                  style={{ width: '100%' }}
                  size="large"
                  placeholder="0"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) =>
                    value!.replace(/\$\s?|(,*)/g, '') as unknown as number
                  }
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Deskripsi
            </span>
          }
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Masukkan deskripsi produk..."
                rows={3}
              />
            )}
          />
        </Form.Item>

        <div className="flex justify-end gap-3 border-t pt-4 dark:border-slate-800">
          <Button onClick={onCancel} size="large" disabled={isSaving}>
            Batal
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isSaving}
            className="bg-primary text-white dark:bg-primary-dark dark:text-slate-950 border-0 font-semibold"
          >
            {product ? 'Simpan Perubahan' : 'Tambah Produk'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
