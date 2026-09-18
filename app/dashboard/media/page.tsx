"use client";

import Link from "next/link";
import { Eye, Plus, Trash2 } from "lucide-react";
import { useMedia } from "../../../hooks/useMedia";
import Image from "next/image";

export default function MediaPage() {
  const {
    media,
    loading,
    error,
    removeMedia,
  } = useMedia();

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این رسانه را حذف کنید؟"
    );

    if (!confirmed) return;

    try {
      await removeMedia(id);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "حذف رسانه با مشکل مواجه شد."
      );
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div
        dir="rtl"
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            رسانه‌ها
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            تصاویر مورد استفاده در فروشگاه را مدیریت کنید.
          </p>
        </div>

        <Link
          href="/dashboard/media/create"
          className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          افزودن رسانه
        </Link>
      </div>

      {loading && (
        <div
          dir="rtl"
          className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500"
        >
          در حال بارگذاری رسانه‌ها...
        </div>
      )}

      {error && (
        <div
          dir="rtl"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      {!loading && !error && media.length === 0 && (
        <div
          dir="rtl"
          className="rounded-2xl border border-gray-200 bg-white p-12 text-center"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            هنوز رسانه‌ای وجود ندارد
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            برای شروع، اولین تصویر خود را اضافه کنید.
          </p>

          <Link
            href="/dashboard/media/create"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
          >
            <Plus size={18} />
            افزودن رسانه
          </Link>
        </div>
      )}

      {!loading && !error && media.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {media.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="flex aspect-square items-center justify-center overflow-hidden bg-gray-50">
                <Image
                  width={200}
                  height={200}
                  src={item.url}
                  alt="رسانه"
                  className="h-full w-full object-contain p-4"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <p
                  dir="ltr"
                  className="truncate text-xs text-gray-500"
                  title={item.url}
                >
                  {item.url}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={`/dashboard/media/${item._id}`}
                    dir="rtl"
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-black"
                  >
                    <Eye size={16} />
                    مشاهده
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                    title="حذف"
                    aria-label="حذف رسانه"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}