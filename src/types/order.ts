export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';

export interface ProductSnapshot {
  name: string;
  category: string;
  provider: string;
  denomination: string;
  imageUrl: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  productId: string | null;
  productSnapshot: ProductSnapshot;
  price: number;
  status: OrderStatus;
  voucherCode: string | null;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  productId: string;
}
