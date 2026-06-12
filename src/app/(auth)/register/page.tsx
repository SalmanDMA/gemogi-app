'use client';

import { Suspense } from 'react';
import { RegisterForm } from '../../../components/forms/register-form';
import { Spin } from 'antd';

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <Suspense fallback={<Spin size="large" />}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
