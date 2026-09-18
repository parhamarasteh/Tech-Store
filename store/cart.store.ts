"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";


export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();

        const existingItem = items.find(
          (item) => item.product._id === product._id
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product._id === product._id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            ),
          });

          return;
        }

        set({
          items: [
            ...items,
            {
              product,
              quantity: 1,
            },
          ],
        });
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter(
            (item) => item.product._id !== productId
          ),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.product._id === productId
              ? {
                  ...item,
                  quantity,
                }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price =
            item.product.sale > 0
              ? item.product.price -
                (item.product.price * item.product.sale) / 100
              : item.product.price;

          return total + price * item.quantity;
        }, 0);
      },

      getItemCount: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },
    }),
    {
      name: "tech-store-cart",
    }
  )
);
