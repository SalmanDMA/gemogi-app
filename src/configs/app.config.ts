export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Gemogi',
  description: 'Digital Voucher & Top-Up Marketplace',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api',
  categories: [
    { key: 'game', label: 'Game', icon: '🎮' },
    { key: 'streaming', label: 'Streaming', icon: '🎬' },
    { key: 'phone_credit', label: 'Pulsa', icon: '📱' },
  ],
  orderStatusPollingInterval: 3000,
};
