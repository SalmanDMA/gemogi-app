export type ProductCategory = 'game' | 'streaming' | 'phone_credit';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  provider: string;
  price: number;
  denomination: string;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface ProductsQuery {
  search?: string;
  category?: ProductCategory;
  page?: number;
  limit?: number;
}
