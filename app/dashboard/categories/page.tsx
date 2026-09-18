"use client";

import Link from "next/link";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCategories } from "../../../hooks/useCategories";
import Image from "next/image";

export default function AdminCategoriesPage() {
  const router = useRouter();

  const {
    categories,
    loading,
    error,
    removeCategory,
  } = useCategories();

  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return categories;
    }

    return categories.filter((category) => {
      return (
        category.name.toLowerCase().includes(value) ||
        category.en_name.toLowerCase().includes(value)
      );
    });
  }, [categories, search]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await removeCategory(id);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("حذف دسته‌بندی با مشکل مواجه شد.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">

        <div dir="rtl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            مدیریت
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
            دسته‌بندی‌ها
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            دسته‌بندی‌های محصولات فروشگاه را مدیریت کنید.
          </p>
        </div>

        <div className="mt-8 flex w-full items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              dir="rtl"
              placeholder="جستجوی دسته‌بندی..."
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
            />
          </div>

          <Link
            href="/dashboard/categories/create"
            dir="rtl"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            افزودن دسته‌بندی
          </Link>
        </div>

        {error && (
          <div
            dir="rtl"
            className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        {loading && (
          <div
            dir="rtl"
            className="mt-8 rounded-3xl border border-zinc-200 bg-white p-12 text-center"
          >
            <p className="text-sm text-zinc-500">
              در حال بارگذاری دسته‌بندی‌ها...
            </p>
          </div>
        )}

        {!loading && !error && filteredCategories.length === 0 && (
          <div
            dir="rtl"
            className="mt-8 rounded-3xl border border-zinc-200 bg-white p-12 text-center"
          >
            <h2 className="text-lg font-semibold text-zinc-900">
              دسته‌بندی‌ای پیدا نشد
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {search
                ? "عبارت دیگری را برای جستجو امتحان کنید."
                : "اولین دسته‌بندی خود را ایجاد کنید."}
            </p>
          </div>
        )}

        {!loading && filteredCategories.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead className="border-b border-zinc-200 bg-zinc-50">
                  <tr>
                    <th
                      dir="rtl"
                      className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500"
                    >
                      نام
                    </th>

                    <th
                      dir="rtl"
                      className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500"
                    >
                      نام انگلیسی
                    </th>

                    <th
                      dir="rtl"
                      className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500"
                    >
                      تصویر
                    </th>

                    <th
                      dir="rtl"
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500"
                    >
                      عملیات
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-100">
                  {filteredCategories.map((category) => (
                    <tr
                      key={category._id}
                      className="transition hover:bg-zinc-50"
                    >
                      <td
                        dir="rtl"
                        className="px-6 py-5 text-right"
                      >
                        <p className="text-sm font-semibold text-zinc-900">
                          {category.name}
                        </p>

                        <p className="mt-1 text-xs text-zinc-400">
                          شناسه: {category._id}
                        </p>
                      </td>

                      <td
                        dir="ltr"
                        className="px-6 py-5 text-left text-sm text-zinc-600"
                      >
                        {category.en_name}
                      </td>

                      <td className="px-6 py-5">
                        {category.image ? (
                          <div className="h-12 w-12 overflow-hidden rounded-xl bg-zinc-100">
                            <Image
                              src={category.image}
                              alt={category.name}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-xl object-cover"
                            />
                          </div>
                        ) : (
                          <span
                            dir="rtl"
                            className="text-sm text-zinc-400"
                          >
                            بدون تصویر
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/categories/${category._id}/edit`}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 transition hover:bg-zinc-100"
                            aria-label={`ویرایش ${category.name}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(category._id)}
                            disabled={deletingId === category._id}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label={`حذف ${category.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              dir="rtl"
              className="border-t border-zinc-200 px-6 py-4"
            >
              <p className="text-sm text-zinc-500">
                {filteredCategories.length} دسته‌بندی
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}