import { apiClient } from '../axios';
import { ApiResponse, PaginatedResponse } from '../../types/api';
import { Product } from '../../types/product';

export interface GetProductsParams {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  includeInactive?: string;
}

export const productsApi = {
  findAll: async (
    params?: GetProductsParams,
  ): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    const response = await apiClient.get<
      ApiResponse<PaginatedResponse<Product>>
    >('/products', { params });
    return response.data;
  },

  findOne: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await apiClient.get<ApiResponse<Product>>(
      `/products/${id}`,
    );
    return response.data;
  },

  create: async (data: Partial<Product>): Promise<ApiResponse<Product>> => {
    const response = await apiClient.post<ApiResponse<Product>>(
      '/products',
      data,
    );
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<Product>,
  ): Promise<ApiResponse<Product>> => {
    const response = await apiClient.patch<ApiResponse<Product>>(
      `/products/${id}`,
      data,
    );
    return response.data;
  },
};
