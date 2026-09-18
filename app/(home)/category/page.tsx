import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getCategories } from "../../../services/category.service";
import type { Category } from "../../../types/category";

export default async function CategoriesPage() {
  let categories: Category[] = [];

  try {
    const result = await getCategories();
    categories = result.data;
  } catch {
    categories = [];
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <div dir="rtl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              فروشگاه
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              دسته‌بندی‌ها
            </h1>

            <p className="mt-3 text-sm text-zinc-500 sm:text-base">
              محصولات مورد نظر خود را بر اساس دسته‌بندی پیدا کنید.
            </p>
          </div>

          <Link
            href="/products"
            dir="rtl"
            className="hidden items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-black sm:inline-flex"
          >
            همه محصولات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {categories.length === 0 ? (
          <div
            dir="rtl"
            className="rounded-3xl border border-zinc-200 bg-white px-6 py-20 text-center"
          >
            <h2 className="text-xl font-semibold text-zinc-900">
              دسته‌بندی‌ای موجود نیست
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              در حال حاضر هیچ دسته‌بندی‌ای در فروشگاه ثبت نشده است.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              مشاهده محصولات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.en_name}`}
                className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 overflow-hidden bg-zinc-100">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                      بدون تصویر
                    </div>
                  )}
                </div>

                <div
                  dir="rtl"
                  className="flex items-center justify-between p-5"
                >
                  <div>
                    <h2 className="text-base font-bold text-zinc-900">
                      {category.name}
                    </h2>

                    {category.en_name && (
                      <p
                        dir="ltr"
                        className="mt-1 text-xs text-zinc-400"
                      >
                        {category.en_name}
                      </p>
                    )}
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 transition group-hover:bg-black group-hover:text-white">
                    <ArrowLeft className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
