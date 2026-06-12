'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { ConfigProvider } from 'antd';
import { lightTheme, darkTheme } from '../configs/theme.config';

interface ThemeProviderProps {
  children: React.ReactNode;
}

function AntdThemeConfigProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
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
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  const activeTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme;
  return <ConfigProvider theme={activeTheme}>{children}</ConfigProvider>;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <AntdThemeConfigProvider>{children}</AntdThemeConfigProvider>
    </NextThemesProvider>
  );
}
