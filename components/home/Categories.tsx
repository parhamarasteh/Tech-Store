"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import Image from "next/image";

export default function Categories() {
  const {
    categories,
    loading,
    error,
  } = useCategories();

  return (
    <section className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p
              dir="rtl"
              className="text-xs font-semibold tracking-[0.2em] text-zinc-400"
            >
              محصولات را بر اساس دسته‌بندی پیدا کنید
            </p>

            <h2
              dir="rtl"
              className="mt-3 text-xl font-bold tracking-tight sm:text-2xl"
            >
              دسته‌بندی‌ها

            </h2>
          </div>

          <Link
            href="/category"
            dir="rtl"
            className="inline-flex items-center gap-2 text-sm font-medium"
          >
            مشاهده همه دسته‌بندی‌ها
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {loading && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-3xl bg-zinc-100"
              />
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.en_name}`}
                className="group overflow-hidden rounded-3xl border border-zinc-200 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  <Image
                    fill
                    src={category.image}
                    alt={category.name}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur">
                    <ArrowUpRight className="h-4 w-4 text-zinc-700 transition group-hover:text-black" />
                  </div>
                </div>

                <div
                  dir="rtl"
                  className="p-6"
                >
                  <h3 className="text-lg font-semibold">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading &&
          !error &&
          categories.length === 0 && (
            <div
              dir="rtl"
              className="mt-10 rounded-2xl border border-dashed border-zinc-300 p-10 text-center"
            >
              <p className="text-sm text-zinc-500">
                هنوز دسته‌بندی‌ای ثبت نشده است.
              </p>
            </div>
          )}

      </div>
    </section>
  );
}
