"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import { createMedia } from "../../services/media.service";
import { addMediaSchema } from "../../validation/media";

export default function MediaForm() {
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const validation = addMediaSchema.safeParse({
      url: url.trim(),
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

      await createMedia(validation.data);

      router.push("/dashboard/media");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ایجاد رسانه با مشکل مواجه شد."
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
            href="/dashboard/media"
            dir="rtl"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            بازگشت به رسانه‌ها
            <ArrowLeft size={16} />
          </Link>
        </div>

        <h1
          dir="rtl"
          className="text-2xl font-bold text-gray-900"
        >
          افزودن رسانه
        </h1>

        <p
          dir="rtl"
          className="mt-1 text-sm text-gray-500"
        >
          یک آدرس تصویر به کتابخانه رسانه اضافه کنید.
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

        <div>
          <label
            htmlFor="url"
            dir="rtl"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            آدرس تصویر
          </label>

          <input
            id="url"
            type="url"
            value={url}
            onChange={(event) =>
              setUrl(event.target.value)
            }
            dir="ltr"
            placeholder="https://example.com/image.webp"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />

          <p
            dir="rtl"
            className="mt-2 text-xs text-gray-400"
          >
            آدرس مستقیم تصویر را وارد کنید.
          </p>
        </div>

        <div className="mt-6">
          <div
            dir="rtl"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <ImageIcon size={16} />
            پیش‌نمایش
          </div>

          <div className="flex aspect-video max-w-md items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            {url ? (
              <Image
                width={200}
                height={200}
                src={url}
                alt="پیش‌نمایش"
                className="h-full w-full object-contain p-4"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span
                dir="rtl"
                className="text-sm text-gray-400"
              >
                پیش‌نمایش تصویر
              </span>
            )}
          </div>
        </div>

        <div
          dir="rtl"
          className="mt-8 flex gap-3"
        >
          <Link
            href="/dashboard/media"
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            انصراف
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "در حال افزودن..."
              : "افزودن رسانه"}
          </button>
        </div>
      </form>
    </div>
  );
}