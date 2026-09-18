"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useProducts } from "../../../hooks/useProducts";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  return (
    <main className="min-h-screen bg-zinc-50">

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

          <p
            dir="rtl"
            className="text-xs font-semibold tracking-[0.2em] text-zinc-400"
          >
            فروشگاه
          </p>

          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <h1
                dir="rtl"
                className="text-4xl font-bold tracking-tight sm:text-5xl"
              >
                همه محصولات
              </h1>

              <p
                dir="rtl"
                className="mt-4 max-w-xl text-sm leading-6 text-zinc-500"
              >
                مجموعه‌ای از جدیدترین محصولات تکنولوژی را مشاهده و بررسی کنید.
              </p>
            </div>

            {!loading && !error && (
              <p
                dir="rtl"
                className="text-sm text-zinc-500"
              >
                {products.length} محصول
              </p>
            )}

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-3xl border border-zinc-200 bg-white"
              >
                <div className="h-[280px] bg-zinc-100" />

                <div className="p-5">
                  <div className="h-3 w-20 rounded bg-zinc-200" />

                  <div className="mt-3 h-5 w-36 rounded bg-zinc-200" />

                  <div className="mt-3 h-4 w-24 rounded bg-zinc-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div
            dir="rtl"
            className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {products.map((product) => {
                  const image = product.media?.[0]?.url;

                  return (
                    <Link
                      key={product._id}
                      href={`/products/${product._id}`}
                      className="group min-w-0"
                    >
                      <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">

                        {/* Image */}
                        <div className="relative h-[280px] overflow-hidden bg-zinc-50">

                          {image ? (
                            <div className="absolute inset-0 flex items-center justify-center p-10">
                              <Image
                                src={image}
                                alt={product.name}
                                width={400}
                                height={400}
                                className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                              />
                            </div>
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <div className="flex h-40 w-32 items-center justify-center rounded-2xl bg-zinc-900">
                                <span className="text-xs font-semibold tracking-[0.25em] text-white">
                                  TECH
                                </span>
                              </div>
                            </div>
                          )}

                          {product.sale > 0 && (
                            <span
                              dir="rtl"
                              className="absolute right-4 top-4 rounded-full bg-black px-3 py-1.5 text-[10px] font-semibold text-white"
                            >
                              {product.sale}% تخفیف
                            </span>
                          )}

                        </div>

                        <div
                          dir="rtl"
                          className="p-5"
                        >

                          <div className="flex items-center justify-between gap-3">

                            <p className="truncate text-xs text-zinc-400">
                              {product.category?.name || "محصول"}
                            </p>

                            {product.brand?.name && (
                              <p className="shrink-0 text-xs text-zinc-400">
                                {product.brand.name}
                              </p>
                            )}

                          </div>

                          <h2 className="mt-2 min-h-[3rem] line-clamp-2 font-semibold leading-6 text-zinc-900">
                            {product.name}
                          </h2>

                          <div className="mt-4 flex items-center justify-between gap-3">

                            <span className="truncate text-sm font-semibold text-zinc-900">
                              {product.price.toLocaleString()} تومان
                            </span>

                            <span
                              dir="rtl"
                              className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-zinc-400 transition group-hover:text-zinc-900"
                            >
                              مشاهده
                              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </span>

                          </div>

                        </div>
                      </article>
                    </Link>
                  );
                })}

              </div>
            ) : (
              <div
                dir="rtl"
                className="rounded-3xl border border-dashed border-zinc-300 bg-white p-16 text-center"
              >
                <h2 className="text-lg font-semibold">
                  محصولی موجود نیست
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  در حال حاضر هیچ محصولی در فروشگاه ثبت نشده است.
                </p>
              </div>
            )}
          </>
        )}

      </section>
    </main>
  );
}