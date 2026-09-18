"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "../../../store/cart.store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotal = useCartStore((state) => state.getTotal);

  const total = getTotal();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-5 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
              <ShoppingBag className="h-8 w-8 text-zinc-400" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-zinc-900">
              سبد خرید شما خالی است
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              چند محصول به سبد خرید خود اضافه کنید تا در اینجا نمایش داده شوند.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              ادامه خرید
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            خرید
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            سبد خرید شما
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            {items.length} محصول در سبد خرید شما
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {items.map((item) => {
              const product = item.product;
              const image = product.media?.[0]?.url;

              const price =
                product.sale > 0
                  ? product.price -
                    (product.price * product.sale) / 100
                  : product.price;

              return (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-3xl border border-zinc-200 bg-white"
                >
                  <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                    <Link
                      href={`/products/${product._id}`}
                      className="relative h-36 w-full shrink-0 overflow-hidden rounded-2xl bg-zinc-50 sm:h-32 sm:w-32"
                    >
                      {image ? (
                        <Image
                          src={image}
                          alt={product.name}
                          fill
                          className="object-contain p-5"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-xs font-semibold tracking-[0.2em]">
                            TECH
                          </span>
                        </div>
                      )}
                    </Link>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-zinc-400">
                        {product.category?.name || "محصول"}
                      </p>

                      <Link href={`/products/${product._id}`}>
                        <h2 className="mt-1 line-clamp-2 font-semibold text-zinc-900 hover:underline">
                          {product.name}
                        </h2>
                      </Link>

                      {product.brand?.name && (
                        <p className="mt-1 text-xs text-zinc-400">
                          {product.brand.name}
                        </p>
                      )}

                      <p className="mt-3 text-sm font-semibold">
                        {price.toLocaleString()} تومان
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                      <div className="flex items-center rounded-full border border-zinc-200">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              product._id,
                              item.quantity - 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-zinc-100"
                          aria-label="کاهش تعداد"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              product._id,
                              item.quantity + 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-zinc-100"
                          aria-label="افزایش تعداد"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(product._id)}
                        className="inline-flex items-center gap-2 text-xs text-zinc-400 transition hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-6 lg:sticky lg:top-28">
            <h2 className="text-lg font-bold">
              خلاصه سفارش
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">جمع جزء</span>
                <span className="font-medium">
                  {total.toLocaleString()} تومان
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-500">هزینه ارسال</span>
                <span className="font-medium">رایگان</span>
              </div>
            </div>

            <div className="my-6 h-px bg-zinc-200" />

            <div className="flex items-center justify-between">
              <span className="font-semibold">مبلغ نهایی</span>

              <span className="text-xl font-bold">
                {total.toLocaleString()} تومان
              </span>
            </div>

            <Link
              href="/cart"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              ادامه و پرداخت
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <Link
              href="/products"
              className="mt-3 flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-black"
            >
              ادامه خرید
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}