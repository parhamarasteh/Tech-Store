"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { createBrand } from "../../services/brand.service";
import { addBrandSchema } from "../../validation/brand";

export default function BrandForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const validation = addBrandSchema.safeParse({
      name: name.trim(),
      logo: logo.trim(),
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

      await createBrand(validation.data);

      router.push("/dashboard/brands");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ایجاد برند با مشکل مواجه شد."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex w-full justify-end">
          <Link
            href="/dashboard/brands"
            dir="rtl"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            <ArrowLeft size={16} />
            بازگشت به برندها
          </Link>
        </div>

        <h1
          dir="rtl"
          className="text-2xl font-bold text-gray-900"
        >
          افزودن برند
        </h1>

        <p
          dir="rtl"
          className="mt-1 text-sm text-gray-500"
        >
          یک برند جدید برای فروشگاه خود ایجاد کنید.
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

        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              dir="rtl"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              نام برند
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              dir="rtl"
              placeholder="مثلاً اپل"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label
              htmlFor="logo"
              dir="rtl"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              آدرس لوگو
            </label>

            <input
              id="logo"
              type="url"
              value={logo}
              onChange={(event) => setLogo(event.target.value)}
              dir="ltr"
              placeholder="https://example.com/apple-logo.webp"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />

            <p
              dir="rtl"
              className="mt-2 text-xs text-gray-400"
            >
              آدرس مستقیم تصویر لوگوی برند را وارد کنید.
            </p>
          </div>

          <div>
            <div
              dir="rtl"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <ImageIcon size={16} />
              پیش‌نمایش لوگو
            </div>

            <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
              {logo ? (
                <Image
                  width={200}
                  height={200}
                  src={logo}
                  alt={name || "لوگوی برند"}
                  className="h-full w-full object-contain p-6"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span
                  dir="rtl"
                  className="text-sm text-gray-400"
                >
                  لوگویی انتخاب نشده است
                </span>
              )}
            </div>
          </div>
        </div>

        <div
          dir="rtl"
          className="mt-8 flex gap-3"
        >
          <Link
            href="/dashboard/brands"
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            انصراف
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "در حال ایجاد..." : "ایجاد برند"}
          </button>
        </div>
      </form>
    </div>
  );
}