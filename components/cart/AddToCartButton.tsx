"use client";

import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "../../types/product";
import { useCartStore } from "../../store/cart.store";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-8 inline-flex cursor-pointer w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
    >
      {added ? (
        <>
          <Check className="h-5 w-5" />
          به سبد خرید اضافه شد
        </>
      ) : (
        <>
          <ShoppingBag className="h-5 w-5" />
          افزودن به سبد خرید
        </>
      )}
    </button>
  );
}