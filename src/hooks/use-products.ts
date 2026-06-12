import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi, GetProductsParams } from '../lib/api/products.api';
import { Product } from '../types/product';

export function useProducts(params?: GetProductsParams) {
  const productsQuery = useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await productsApi.findAll(params);
      return response.data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 30000,
  });

  return {
    products: productsQuery.data?.items ?? [],
    meta: productsQuery.data?.meta,
    isPending: productsQuery.isPending,
    isError: productsQuery.isError,
    error: productsQuery.error,
    refetch: productsQuery.refetch,
  };
}

export function useProductDetail(id: string | undefined) {
  const productQuery = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');
      const response = await productsApi.findOne(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 60000,
  });

  return {
    product: productQuery.data,
    isPending: productQuery.isPending,
    isError: productQuery.isError,
    error: productQuery.error,
  };
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Product>) => {
      const response = await productsApi.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Product>;
    }) => {
      const response = await productsApi.update(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
}
