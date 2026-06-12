'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/use-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, isLoggingIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      message.success('Berhasil masuk!');
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      let errMsg = 'Email atau password salah';
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
          Selamat Datang Kembali
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Masuk ke akun Gemogi Anda untuk melanjutkan pembelian
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
                autoComplete="current-password"
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
            loading={isLoggingIn}
            className="font-bold text-base bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 text-white dark:text-slate-950 border-0"
            style={{ height: 48 }}
          >
            Masuk
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mt-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Belum punya akun?{' '}
          <Link
            href="/register"
            className="font-bold text-primary dark:text-primary-dark hover:underline"
          >
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
