'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  email: z.email('Format email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung minimal satu huruf besar')
    .regex(/[0-9]/, 'Password harus mengandung minimal satu angka'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register, isRegistering } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await register(values);
      message.success('Pendaftaran berhasil! Selamat datang.');
      router.push('/');
      router.refresh();
    } catch (err) {
      let errMsg = 'Email sudah terdaftar atau terjadi kesalahan';
      if (axios.isAxiosError(err)) {
        errMsg = err.response?.data?.message ?? errMsg;
      }
      message.error(errMsg);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-slate-900 border rounded-2xl shadow-xl transition-all duration-300 dark:border-slate-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-inter">
          Daftar Akun Baru
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Buat akun Gemogi Anda untuk mulai membeli voucher instan
        </p>
      </div>

      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        requiredMark={false}
      >
        <Form.Item
          label={
            <span className="text-slate-600 dark:text-slate-300 font-semibold">
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
                placeholder="John Doe"
                autoComplete="name"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-slate-600 dark:text-slate-300 font-semibold">
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
                placeholder="john@example.com"
                type="email"
                autoComplete="email"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-slate-600 dark:text-slate-300 font-semibold">
              Password
            </span>
          }
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                prefix={<LockOutlined className="text-slate-400" />}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            )}
          />
        </Form.Item>

        <Form.Item className="mt-8">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isRegistering}
            className="font-bold text-base bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 text-white dark:text-slate-950 border-0"
            style={{ height: 48 }}
          >
            Daftar
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Sudah punya akun?{' '}
          <Link
            href="/login"
            className="font-bold text-primary dark:text-primary-dark hover:underline"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
