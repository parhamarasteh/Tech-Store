"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "../../../hooks/useProducts";

export default function AdminProductsPage() {
  const router = useRouter();

  const {
    products,
    loading,
    error,
    removeProduct,
  } = useProducts();

  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(value) ||
        product.category?.name?.toLowerCase().includes(value) ||
        product.brand?.name?.toLowerCase().includes(value)
      );
    });
  }, [products, search]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await removeProduct(id);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("حذف محصول با مشکل مواجه شد.");
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
            محصولات
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            محصولات فروشگاه خود را مدیریت کنید.
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
              placeholder="جستجوی محصولات..."
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
            />
          </div>

          <Link
            href="/dashboard/products/create"
            dir="rtl"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            افزودن محصول
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
              در حال بارگذاری محصولات...
            </p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div
            dir="rtl"
            className="mt-8 rounded-3xl border border-zinc-200 bg-white p-12 text-center"
          >
            <h2 className="text-lg font-semibold text-zinc-900">
              محصولی پیدا نشد
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {search
                ? "عبارت دیگری را برای جستجو امتحان کنید."
                : "اولین محصول خود را ایجاد کنید."}
            </p>
          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="border-b border-zinc-200 bg-zinc-50">
                  <tr>
                    <th
                      dir="rtl"
                      className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500"
                    >
                      محصول
                    </th>

                    <th
                      dir="rtl"
                      className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500"
                    >
                      دسته‌بندی
                    </th>

                    <th
                      dir="rtl"
                      className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500"
                    >
                      برند
                    </th>

                    <th
                      dir="rtl"
                      className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500"
                    >
                      قیمت
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
                  {filteredProducts.map((product) => {
                    const image = product.media?.[0]?.url;

                    return (
                      <tr
                        key={product._id}
                        className="transition hover:bg-zinc-50"
                      >
                        <td
                          dir="rtl"
                          className="px-6 py-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                              {image && (
                                <Image
                                  src={image}
                                  alt={product.name}
                                  fill
                                  className="object-contain p-2"
                                />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-xs truncate text-sm font-semibold text-zinc-900">
                                {product.name}
                              </p>

                              <p
                                dir="ltr"
                                className="mt-1 text-xs text-zinc-400"
                              >
                                ID: {product._id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td
                          dir="rtl"
                          className="px-6 py-4 text-sm text-zinc-600"
                        >
                          {product.category?.name || "-"}
                        </td>

                        <td
                          dir="rtl"
                          className="px-6 py-4 text-sm text-zinc-600"
                        >
                          {product.brand?.name || "-"}
                        </td>

                        <td className="px-6 py-4">
                          <p
                            dir="rtl"
                            className="text-sm font-semibold text-zinc-900"
                          >
                            {product.price.toLocaleString()} تومان
                          </p>

                          {product.sale > 0 && (
                            <p
                              dir="rtl"
                              className="mt-1 text-xs text-zinc-400"
                            >
                              {product.sale}% تخفیف
                            </p>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/dashboard/products/${product._id}/edit`}
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 transition hover:bg-zinc-100"
                              aria-label={`ویرایش ${product.name}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(product._id)
                              }
                              disabled={
                                deletingId === product._id
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              aria-label={`حذف ${product.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div
              dir="rtl"
              className="border-t border-zinc-200 px-6 py-4"
            >
              <p className="text-sm text-zinc-500">
                {filteredProducts.length} محصول
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}