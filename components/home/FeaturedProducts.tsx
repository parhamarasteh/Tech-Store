"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";

export default function FeaturedProducts() {
  const {
    products,
    loading,
    error,
  } = useProducts();

  const featuredProducts = products.slice(0, 4);

  return (
    <section className="bg-zinc-50 px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <h2
            dir="rtl"
            className="mt-3 text-xl font-bold tracking-tight sm:text-2xl"
          >
            محصولات منتخب
          </h2>

          <Link
            href="/products"
            dir="rtl"
            className="inline-flex items-center gap-2 text-sm font-medium"
          >
            مشاهده همه
            <ArrowLeft className="h-4 w-4" />
          </Link>

        </div>

        {loading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-3xl border border-zinc-200 bg-white"
              >
                <div className="h-[280px] bg-zinc-100" />

                <div className="p-5">
                  <div className="h-3 w-20 rounded bg-zinc-200" />

                  <div className="mt-3 h-5 w-32 rounded bg-zinc-200" />

                  <div className="mt-2 h-5 w-24 rounded bg-zinc-200" />

                  <div className="mt-5 h-4 w-28 rounded bg-zinc-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div
            dir="rtl"
            className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {featuredProducts.map((product) => {
              const image = product.media?.[0]?.url;

              return (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="group min-w-0"
                >
                  <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">

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
                      </div>
                    </div>

                  </article>
                </Link>
              );
            })}

          </div>
        )}

        {!loading &&
          !error &&
          featuredProducts.length === 0 && (
            <div
              dir="rtl"
              className="mt-10 rounded-2xl border border-dashed border-zinc-300 p-10 text-center"
            >
              <p className="text-sm text-zinc-500">
                هنوز محصولی ثبت نشده است.
              </p>
            </div>
          )}

      </div>
    </section>
  );
}
