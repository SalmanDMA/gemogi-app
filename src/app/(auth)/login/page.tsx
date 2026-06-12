'use client';

import { Suspense } from 'react';
import { LoginForm } from '../../../components/forms/login-form';
import { Spin } from 'antd';

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <Suspense fallback={<Spin size="large" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
