import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/auth.store';
import { authApi } from '../lib/api/auth.api';
import {
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
} from '../types/auth';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    setAuth,
    logout: storeLogout,
    setUser,
  } = useAuthStore();

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const response = await authApi.updateProfile(payload);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await authApi.login(payload);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const response = await authApi.register(payload);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        await authApi.logout();
      } catch {}
    },
    onSettled: () => {
      storeLogout();
    },
  });

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await authApi.getMe();
      return response.data.user;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });

  return {
    user: meQuery.data ?? user,
    isAuthenticated,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    updateProfileError: updateProfileMutation.error,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    updateProfile: updateProfileMutation.mutateAsync,
  };
}
