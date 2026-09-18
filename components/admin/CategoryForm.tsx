"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useCategories } from "../../hooks/useCategories";
import { addCategorySchema } from "../../validation/category";

export default function CategoryForm() {
  const router = useRouter();
  const { addCategory } = useCategories();

  const [name, setName] = useState("");
  const [enName, setEnName] = useState("");
  const [image, setImage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    const validation = addCategorySchema.safeParse({
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
      setSubmitting(true);

      await addCategory(validation.data);

      router.push("/dashboard/categories");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ایجاد دسته‌بندی با مشکل مواجه شد."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <div className="flex w-full justify-end pt-4">
          <Link
            href="/dashboard/categories"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            بازگشت به دسته‌بندی‌ها
          </Link>
        </div>

        <h1
          dir="rtl"
          className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
        >
          افزودن دسته‌بندی
        </h1>

        <p dir="rtl" className="mt-2 text-sm text-gray-500">
          یک دسته‌بندی جدید برای محصولات ایجاد کنید.
        </p>
      </div>

      {error && (
        <div
          dir="rtl"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              dir="rtl"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              نام دسته‌بندی
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              dir="rtl"
              placeholder="گوشی موبایل"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="en_name"
              dir="rtl"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              نام انگلیسی
            </label>

            <input
              id="en_name"
              type="text"
              value={enName}
              onChange={(event) => setEnName(event.target.value)}
              dir="ltr"
              placeholder="mobile"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              dir="rtl"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              آدرس تصویر
            </label>

            <input
              id="image"
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              dir="ltr"
              placeholder="https://example.com/mobile.jpg"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
            />

            {image && (
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                <Image
                  width={192}
                  height={192}
                  src={image}
                  alt="پیش‌نمایش دسته‌بندی"
                  className="h-48 w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div
          dir="rtl"
          className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
        >
          <button
            type="button"
            onClick={() => router.push("/dashboard/categories")}
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "در حال ایجاد..."
              : "ایجاد دسته‌بندی"}
          </button>
        </div>
      </form>
    </div>
  );
}