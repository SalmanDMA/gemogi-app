import { apiClient } from '../axios';
import { ApiResponse, PaginatedResponse } from '../../types/api';
import { Order } from '../../types/order';

export interface CreateOrderPayload {
  productId: string;
}

export const ordersApi = {
  create: async (payload: CreateOrderPayload): Promise<ApiResponse<Order>> => {
    const response = await apiClient.post<ApiResponse<Order>>(
      '/orders',
      payload,
    );
    return response.data;
  },

  findAll: async (
    page = 1,
    limit = 20,
  ): Promise<ApiResponse<PaginatedResponse<Order>>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
      '/orders',
      {
        params: { page, limit },
      },
    );
    return response.data;
  },

  findOne: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data;
  },
};
