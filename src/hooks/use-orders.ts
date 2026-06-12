import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersApi, CreateOrderPayload } from '../lib/api/orders.api';

export function useOrders(page = 1, limit = 20) {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ['orders', page, limit],
    queryFn: async () => {
      const response = await ordersApi.findAll(page, limit);
      return response.data;
    },
    staleTime: 5000,
    refetchInterval: (query) => {
      const data = query.state.data;
      const hasActive = data?.items?.some(
        (o) => o.status === 'PENDING' || o.status === 'PROCESSING',
      );
      return hasActive ? 3000 : false;
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const response = await ordersApi.create(payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return {
    orders: ordersQuery.data?.items ?? [],
    meta: ordersQuery.data?.meta,
    isPending: ordersQuery.isPending,
    isError: ordersQuery.isError,
    error: ordersQuery.error,
    createOrder: createOrderMutation.mutateAsync,
    isCreating: createOrderMutation.isPending,
    createError: createOrderMutation.error,
  };
}

export function useOrderDetail(id: string | undefined) {
  const orderDetailQuery = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      if (!id) throw new Error('Order ID is required');
      const response = await ordersApi.findOne(id);
      return response.data;
    },
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data;
      const isPendingOrProcessing =
        data?.status === 'PENDING' || data?.status === 'PROCESSING';
      return isPendingOrProcessing ? 3000 : false;
    },
  });

  return {
    order: orderDetailQuery.data,
    isPending: orderDetailQuery.isPending,
    isError: orderDetailQuery.isError,
    error: orderDetailQuery.error,
    refetch: orderDetailQuery.refetch,
  };
}
