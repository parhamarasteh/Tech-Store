"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import {
  getCategory,
  updateCategory,
} from "../../services/category.service";

import { updateCategorySchema } from "../../validation/category";

interface CategoryEditFormProps {
  id: string;
}

export default function CategoryEditForm({
  id,
}: CategoryEditFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [enName, setEnName] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadCategory() {
      try {
        const result = await getCategory(id);

        if (mounted) {
          setName(result.name);
          setEnName(result.en_name);
          setImage(result.image);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "بارگذاری دسته‌بندی با مشکل مواجه شد."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCategory();

    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const validation = updateCategorySchema.safeParse({
      name: name.trim(),
      en_name: enName.trim(),
      image: image.trim(),
    });

    if (!validation.success) {
      setError(
        validation.error.issues[0]?.message ||
          "لطفاً اطلاعات فرم را بررسی کنید."
      );
      return;
    }

    try {
      setSaving(true);
      setError(null);

      await updateCategory(id, validation.data);

      router.push("/dashboard/categories");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ویرایش دسته‌بندی با مشکل مواجه شد."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 h-96 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  if (error && !name && !enName) {
    return (
      <div className="p-8">
        <div
          dir="rtl"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600"
        >
          {error}
        </div>

        <button
          onClick={() =>
            router.push("/dashboard/categories")
          }
          dir="rtl"
          className="mt-4 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white"
        >
          بازگشت به دسته‌بندی‌ها
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6 lg:p-8">
      <div className="mb-8">
        <h1
          dir="rtl"
          className="text-2xl font-bold text-gray-900"
        >
          ویرایش دسته‌بندی
        </h1>

        <p
          dir="rtl"
          className="mt-1 text-sm text-gray-500"
        >
          اطلاعات دسته‌بندی را به‌روزرسانی کنید.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {error && (
          <div
            dir="rtl"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              dir="rtl"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              نام دسته‌بندی
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              dir="rtl"
              placeholder="مثلاً گوشی موبایل"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label
              htmlFor="en_name"
              dir="rtl"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              نام انگلیسی
            </label>

            <input
              id="en_name"
              type="text"
              value={enName}
              onChange={(e) => setEnName(e.target.value)}
              dir="ltr"
              placeholder="مثلاً mobile"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              dir="rtl"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              آدرس تصویر
            </label>

            <input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              dir="ltr"
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          {image && (
            <div>
              <p
                dir="rtl"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                پیش‌نمایش
              </p>

              <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                <Image
                  width={200}
                  height={200}
                  src={image}
                  alt={name || "پیش‌نمایش دسته‌بندی"}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div
          dir="rtl"
          className="mt-8 flex gap-3"
        >
          <button
            type="button"
            onClick={() =>
              router.push("/dashboard/categories")
            }
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "در حال ذخیره..."
              : "ذخیره تغییرات"}
          </button>
        </div>
      </form>
    </div>
  );
}