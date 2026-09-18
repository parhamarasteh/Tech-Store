"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useProducts } from "../../../hooks/useProducts";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  const {
    products,
    loading,
    error,
  } = useProducts();

  const filteredProducts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return products;
    }

    return products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const brand = product.brand?.name?.toLowerCase() || "";
      const category = product.category?.name?.toLowerCase() || "";

      return (
        name.includes(value) ||
        brand.includes(value) ||
        category.includes(value)
      );
    });
  }, [products, query]);

  return (
    <main className="min-h-screen bg-zinc-50">

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">

          <p
            dir="rtl"
            className="text-xs font-semibold tracking-[0.2em] text-zinc-400"
          >
            فروشگاه
          </p>

          <h1
            dir="rtl"
            className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            جستجوی محصولات
          </h1>

          <div className="mt-8 max-w-2xl">
            <div className="relative">

              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />

              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                dir="rtl"
                placeholder="جستجوی محصول، برند یا دسته‌بندی..."
                className="h-14 w-full rounded-full border border-zinc-200 bg-zinc-50 pl-14 pr-14 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-900"
                  aria-label="پاک کردن جستجو"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

            </div>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {!loading && !error && (
          <div className="mb-8 flex items-center justify-between">

            <p
              dir="rtl"
              className="text-sm text-zinc-500"
            >
              {filteredProducts.length} محصول پیدا شد
            </p>

            {query && (
              <p
                dir="rtl"
                className="max-w-[50%] truncate text-sm font-medium text-zinc-900"
              >
                «{query}»
              </p>
            )}

          </div>
        )}

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

        {!loading &&
          !error &&
          filteredProducts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {filteredProducts.map((product) => {
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

                          <span
                            dir="rtl"
                            className="inline-flex shrink-0 items-center gap-1 text-xs text-zinc-400 transition group-hover:text-zinc-900"
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
          )}

        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <div
              dir="rtl"
              className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-20 text-center"
            >

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
                <Search className="h-6 w-6 text-zinc-400" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-zinc-900">
                محصولی پیدا نشد
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
                نام محصول، برند یا دسته‌بندی دیگری را جستجو کنید.
              </p>

              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                مشاهده همه محصولات
                <ArrowLeft className="h-4 w-4" />
              </Link>

            </div>
          )}

      </section>
    </main>
  );
}