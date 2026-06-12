'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/use-auth';
import { UpdateProfilePayload } from '../../types/auth';

const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((val) => {
      if (!val) return true;
      return val.length >= 8;
    }, 'Password minimal 8 karakter')
    .refine((val) => {
      if (!val) return true;
      return /[A-Z]/.test(val);
    }, 'Password harus mengandung minimal satu huruf besar')
    .refine((val) => {
      if (!val) return true;
      return /[0-9]/.test(val);
    }, 'Password harus mengandung minimal satu angka'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { user, updateProfile, isUpdatingProfile } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const payload: UpdateProfilePayload = {
        name: values.name,
        email: values.email,
      };
      if (values.password) {
        payload.password = values.password;
      }
      await updateProfile(payload);
      message.success('Profil berhasil diperbarui!');
      reset({
        name: values.name,
        email: values.email,
        password: '',
      });
    } catch (err) {
      let errMsg = 'Gagal memperbarui profil';
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
          Edit Profil Saya
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Perbarui informasi nama lengkap, email, atau password akun Anda
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
            <span className="text-slate-600 dark:text-slate-300 font-semibold text-left block">
              Password Baru (Opsional)
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
                placeholder="Kosongkan jika tidak ingin diubah"
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
            loading={isUpdatingProfile}
            className="font-bold text-base bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 text-white dark:text-slate-950 border-0 cursor-pointer"
            style={{ height: 48 }}
          >
            Simpan Perubahan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
