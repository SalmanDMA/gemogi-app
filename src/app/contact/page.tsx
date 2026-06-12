'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, Input, Button, message } from 'antd';
import {
  MailOutlined,
  UserOutlined,
  MessageOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { apiClient } from '../../lib/axios';
import Link from 'next/link';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(50, 'Nama maksimal 50 karakter'),
  email: z.string().email('Format email tidak valid'),
  subject: z
    .string()
    .min(5, 'Subjek minimal 5 karakter')
    .max(100, 'Subjek maksimal 100 karakter'),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    try {
      await apiClient.post('/products/contact', values);
      message.success('Pesan Anda berhasil dikirim!');
      reset();
    } catch {
      message.error('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mb-4 self-start">
        <Link href="/">
          <Button icon={<ArrowLeftOutlined />} type="text">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md p-8 bg-white dark:bg-slate-900 border rounded-2xl shadow-xl transition-all duration-300 dark:border-slate-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-inter">
            Hubungi Kami
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Ada pertanyaan atau kendala? Kirimkan pesan kepada tim Gemogi
          </p>
        </div>

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          requiredMark={false}
        >
          <Form.Item
            label={
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                Nama Lengkap
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
                  size="large"
                  prefix={<UserOutlined className="text-slate-400" />}
                  placeholder="Masukkan nama lengkap Anda"
                  autoComplete="name"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                Email
              </span>
            }
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  prefix={<MailOutlined className="text-slate-400" />}
                  placeholder="nama@email.com"
                  type="email"
                  autoComplete="email"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                Subjek
              </span>
            }
            validateStatus={errors.subject ? 'error' : ''}
            help={errors.subject?.message}
          >
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  prefix={<FileTextOutlined className="text-slate-400" />}
                  placeholder="Judul atau topik pesan Anda"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                Pesan
              </span>
            }
            validateStatus={errors.message ? 'error' : ''}
            help={errors.message?.message}
          >
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  placeholder="Tuliskan detail pertanyaan atau kendala Anda di sini..."
                  rows={4}
                />
              )}
            />
          </Form.Item>

          <Form.Item className="mt-8 mb-0">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              icon={<MessageOutlined />}
              className="font-bold text-base bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 text-white dark:text-slate-950 border-0"
              style={{ height: 48, borderRadius: 10 }}
            >
              Kirim Pesan
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
