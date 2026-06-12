import { create } from 'zustand';
import { Product } from '../types/product';

interface UIState {
  checkoutModalOpen: boolean;
  selectedProduct: Product | null;
  openCheckout: (product: Product) => void;
  closeCheckout: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  checkoutModalOpen: false,
  selectedProduct: null,
  openCheckout: (product) =>
    set({ checkoutModalOpen: true, selectedProduct: product }),
  closeCheckout: () => set({ checkoutModalOpen: false, selectedProduct: null }),
}));
