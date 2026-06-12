'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Dropdown, MenuProps, message } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../hooks/use-auth';
import { ThemeSwitcher } from './theme-switcher';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
        setMounted(true);
      }
    }, 0);
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      message.success('Berhasil keluar');
      router.push('/login');
      router.refresh();
    } catch {
      message.error('Gagal keluar');
    }
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link href="/profile">Edit Profil</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Keluar',
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider gradient-text font-inter">
                GEMOGI
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />

            {mounted && isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link href="/orders" className="hidden sm:inline-block">
                  <Button type="text" icon={<ShoppingCartOutlined />}>
                    Pesanan
                  </Button>
                </Link>
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  arrow
                >
                  <Button type="primary" shape="round" icon={<UserOutlined />}>
                    <span className="hidden sm:inline">{user?.name}</span>
                  </Button>
                </Dropdown>
              </div>
            ) : (
              mounted && (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button type="text">Masuk</Button>
                  </Link>
                  <Link href="/register">
                    <Button type="primary" shape="round">
                      Daftar
                    </Button>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
