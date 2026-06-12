'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) {
    return (
      <Button type="text" shape="circle" style={{ width: 40, height: 40 }} />
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      type="text"
      shape="circle"
      icon={
        resolvedTheme === 'dark' ? (
          <SunOutlined className="text-xl text-yellow-400" />
        ) : (
          <MoonOutlined className="text-xl text-indigo-600" />
        )
      }
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
      }}
      title={
        resolvedTheme === 'dark'
          ? 'Switch to Light Mode'
          : 'Switch to Dark Mode'
      }
    />
  );
}
