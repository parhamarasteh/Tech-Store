"use client";

import Link from "next/link";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useBrands } from "../../../hooks/useBrands";
import Image from "next/image";

export default function AdminBrandsPage() {
  const router = useRouter();

  const {
    brands,
    loading,
    error,
    removeBrand,
  } = useBrands();

  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredBrands = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return brands;
    }

    return brands.filter((brand) => {
      return brand.name.toLowerCase().includes(value);
    });
  }, [brands, search]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این برند را حذف کنید؟"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await removeBrand(id);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("حذف برند با مشکل مواجه شد.");
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
            برندها
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            برندهای محصولات فروشگاه را مدیریت کنید.
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
              placeholder="جستجوی برند..."
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
            />
          </div>

          <Link
            href="/dashboard/brands/create"
            dir="rtl"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            <Plus className="h-4 w-4" />
            افزودن برند
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
              در حال بارگذاری برندها...
            </p>
          </div>
        )}

        {!loading && !error && filteredBrands.length === 0 && (
          <div
            dir="rtl"
            className="mt-8 rounded-3xl border border-zinc-200 bg-white p-12 text-center"
          >
            <h2 className="text-lg font-semibold text-zinc-900">
              برندی پیدا نشد
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {search
                ? "عبارت دیگری را برای جستجو امتحان کنید."
                : "اولین برند خود را ایجاد کنید."}
            </p>
          </div>
        )}

        {!loading && filteredBrands.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="border-b border-zinc-200 bg-zinc-50">
                  <tr>
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
                      لوگو
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
                  {filteredBrands.map((brand) => (
                    <tr
                      key={brand._id}
                      className="transition hover:bg-zinc-50"
                    >
                      <td
                        dir="rtl"
                        className="px-6 py-5 text-right"
                      >
                        <p className="text-sm font-semibold text-zinc-900">
                          {brand.name}
                        </p>

                        <p className="mt-1 text-xs text-zinc-400">
                          شناسه: {brand._id}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        {brand.logo ? (
                          <div className="flex h-12 w-20 items-center justify-center overflow-hidden rounded-xl bg-zinc-100 p-2">
                            <Image
                              src={brand.logo}
                              alt={brand.name}
                              width={80}
                              height={48}
                              className="h-12 w-20 rounded-xl bg-zinc-100 object-contain p-2"
                            />
                          </div>
                        ) : (
                          <span
                            dir="rtl"
                            className="text-sm text-zinc-400"
                          >
                            بدون لوگو
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/brands/${brand._id}/edit`}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 transition hover:bg-zinc-100"
                            aria-label={`ویرایش ${brand.name}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(brand._id)}
                            disabled={deletingId === brand._id}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label={`حذف ${brand.name}`}
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
                {filteredBrands.length} برند
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}