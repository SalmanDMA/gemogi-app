'use client';

import { Suspense } from 'react';
import { ProfileForm } from '../../components/forms/profile-form';
import { Spin } from 'antd';

export default function ProfilePage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-12">
      <Suspense fallback={<Spin size="large" />}>
        <ProfileForm />
      </Suspense>
    </div>
  );
}
