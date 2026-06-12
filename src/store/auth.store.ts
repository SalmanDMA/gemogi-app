import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../types/auth';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (
    user: User | null,
    accessToken: string | null,
    refreshToken: string | null,
  ) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken, refreshToken) => {
        if (typeof window !== 'undefined') {
          if (accessToken) {
            document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; SameSite=Lax`;
          } else {
            document.cookie =
              'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          }
          if (refreshToken) {
            document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; SameSite=Lax`;
          } else {
            document.cookie =
              'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          }
        }
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: !!accessToken,
        });
      },
      setTokens: (accessToken, refreshToken) => {
        if (typeof window !== 'undefined') {
          if (accessToken) {
            document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; SameSite=Lax`;
          } else {
            document.cookie =
              'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          }
          if (refreshToken) {
            document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; SameSite=Lax`;
          } else {
            document.cookie =
              'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          }
        }
        set({ accessToken, refreshToken, isAuthenticated: !!accessToken });
      },
      setUser: (user) => set({ user }),
      logout: () => {
        if (typeof window !== 'undefined') {
          document.cookie =
            'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          document.cookie =
            'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'gemogi-auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
