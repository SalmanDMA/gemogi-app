import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

const BRAND = {
  primary: '#6941C6',
  secondary: '#9B8AFB',
  accent: '#F4A261',
  success: '#12B76A',
  warning: '#F79009',
  error: '#F04438',
};

export const lightTheme: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    colorPrimary: BRAND.primary,
    colorSuccess: BRAND.success,
    colorWarning: BRAND.warning,
    colorError: BRAND.error,
    colorInfo: BRAND.secondary,
    borderRadius: 10,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14,
    colorBgContainer: '#FFFFFF',
    colorBgLayout: '#F9FAFB',
    colorBgElevated: '#FFFFFF',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
  },
  components: {
    Button: {
      primaryShadow: `0 0 18px rgba(105,65,198,0.35)`,
      borderRadius: 8,
    },
    Card: {
      borderRadius: 12,
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    },
    Input: {
      borderRadius: 8,
    },
    Table: {
      borderRadius: 12,
    },
    Tag: {
      borderRadius: 6,
    },
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    colorPrimary: BRAND.secondary,
    colorSuccess: BRAND.success,
    colorWarning: BRAND.warning,
    colorError: BRAND.error,
    colorInfo: BRAND.secondary,
    borderRadius: 10,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14,
    colorBgContainer: '#1A1A2E',
    colorBgLayout: '#0D0D1A',
    colorBgElevated: '#16213E',
  },
  components: {
    Button: {
      primaryShadow: `0 0 18px rgba(155,138,251,0.4)`,
      borderRadius: 8,
    },
    Card: {
      borderRadius: 12,
    },
    Input: {
      borderRadius: 8,
    },
    Table: {
      borderRadius: 12,
    },
    Tag: {
      borderRadius: 6,
    },
  },
};
