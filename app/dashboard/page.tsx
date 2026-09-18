"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  ImageIcon,
  LayoutGrid,
  Package,
  Tags,
} from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useBrands } from "../../hooks/useBrands";
import { useMedia } from "../../hooks/useMedia";

export default function DashboardPage() {
  const {
    products,
    loading: productsLoading,
  } = useProducts();

  const {
    categories,
    loading: categoriesLoading,
  } = useCategories();

  const {
    brands,
    loading: brandsLoading,
  } = useBrands();

  const {
    media,
    loading: mediaLoading,
  } = useMedia();

  const stats = [
    {
      title: "محصولات",
      value: products?.length,
      loading: productsLoading,
      icon: Package,
      href: "/dashboard/products",
    },
    {
      title: "دسته‌بندی‌ها",
      value: categories?.length,
      loading: categoriesLoading,
      icon: LayoutGrid,
      href: "/dashboard/categories",
    },
    {
      title: "برندها",
      value: brands?.length,
      loading: brandsLoading,
      icon: Tags,
      href: "/dashboard/brands",
    },
    {
      title: "رسانه‌ها",
      value: media?.length,
      loading: mediaLoading,
      icon: ImageIcon,
      href: "/dashboard/media",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-50 p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">

        <div dir="rtl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            پنل مدیریت
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
            داشبورد
          </h1>

        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Link
                key={stat.title}
                href={stat.href}
                className="group rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100">
                    <Icon className="h-5 w-5 text-zinc-700" />
                  </div>

                  <ArrowLeft className="h-4 w-4 text-zinc-300 transition group-hover:translate-x-1 group-hover:text-zinc-700" />
                </div>

                <p
                  dir="rtl"
                  className="mt-6 text-sm font-medium text-zinc-500"
                >
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
                  {stat.loading ? "..." : stat.value}
                </p>
              </Link>
            );
          })}
        </div>

        <section className="mt-8">
          <div dir="rtl" className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">
                دسترسی سریع
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                فروشگاه خود را سریع مدیریت کنید.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/dashboard/admin/products/create"
              className="group flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100">
                  <Package className="h-5 w-5" />
                </div>

                <div dir="rtl">
                  <p className="font-semibold text-zinc-900">
                    افزودن محصول
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    ایجاد محصول جدید
                  </p>
                </div>
              </div>

              <ArrowLeft className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/dashboard/admin/categories/create"
              className="group flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100">
                  <LayoutGrid className="h-5 w-5" />
                </div>

                <div dir="rtl">
                  <p className="font-semibold text-zinc-900">
                    افزودن دسته‌بندی
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    ایجاد دسته‌بندی جدید
                  </p>
                </div>
              </div>

              <ArrowLeft className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/dashboard/admin/brands/create"
              className="group flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100">
                  <Tags className="h-5 w-5" />
                </div>

                <div dir="rtl">
                  <p className="font-semibold text-zinc-900">
                    افزودن برند
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    ایجاد برند جدید
                  </p>
                </div>
              </div>

              <ArrowLeft className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/dashboard/media"
              className="group flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100">
                  <ImageIcon className="h-5 w-5" />
                </div>

                <div dir="rtl">
                  <p className="font-semibold text-zinc-900">
                    رسانه‌ها
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    مدیریت تصاویر محصولات
                  </p>
                </div>
              </div>

              <ArrowLeft className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6">
          <div dir="rtl" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100">
              <Boxes className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-zinc-900">
                نمای کلی فروشگاه
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                اطلاعات فعلی دریافت‌شده از بک‌اند.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div
              dir="rtl"
              className="rounded-2xl bg-zinc-50 p-5"
            >
              <p className="text-xs text-zinc-400">
                محصولات دارای تخفیف
              </p>

              <p className="mt-2 text-2xl font-bold">
                {productsLoading
                  ? "..."
                  : products.filter((product) => product.sale > 0).length}
              </p>
            </div>

            <div
              dir="rtl"
              className="rounded-2xl bg-zinc-50 p-5"
            >
              <p className="text-xs text-zinc-400">
                تعداد کل محصولات
              </p>

              <p className="mt-2 text-2xl font-bold">
                {productsLoading ? "..." : products.length}
              </p>
            </div>

            <div
              dir="rtl"
              className="rounded-2xl bg-zinc-50 p-5"
            >
              <p className="text-xs text-zinc-400">
                تعداد کل برندها
              </p>

              <p className="mt-2 text-2xl font-bold">
                {brandsLoading ? "..." : brands.length}
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}