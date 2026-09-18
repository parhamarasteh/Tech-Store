"use client";

import { useBrands } from "../../hooks/useBrands";

export default function Brands() {
  const {
    brands,
    loading,
    error,
  } = useBrands();

  return (
    <section className="border-y border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        <p
          dir="rtl"
          className="text-center text-lg font-semibold tracking-[0.2em] text-zinc-400"
        >
          برندهای منتخب
        </p>

        {loading && (
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl bg-zinc-100"
              />
            ))}
          </div>
        )}

        {error && (
          <div
            dir="rtl"
            className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="flex h-24 flex-col items-center justify-center gap-3 rounded-2xl bg-zinc-50 px-5 transition hover:bg-zinc-100"
              >
                <span
                  dir="rtl"
                  className="text-sm font-semibold text-zinc-600"
                >
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {!loading &&
          !error &&
          brands.length === 0 && (
            <div
              dir="rtl"
              className="mt-8 rounded-2xl border border-dashed border-zinc-300 p-8 text-center"
            >
              <p className="text-sm text-zinc-500">
                هنوز برندی ثبت نشده است.
              </p>
            </div>
          )}

      </div>
    </section>
  );
}
