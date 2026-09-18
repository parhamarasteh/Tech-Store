"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Media } from "../../types/media";
import {
  deleteMedia,
  getMediaById,
} from "../../services/media.service";
import Image from "next/image";

interface MediaViewProps {
  id: string;
}

export default function MediaView({
  id,
}: MediaViewProps) {
  const router = useRouter();

  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadMedia() {
      try {
        const result = await getMediaById(id);

        if (mounted) {
          setMedia(result);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "بارگذاری رسانه با مشکل مواجه شد."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadMedia();

    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleDelete() {
    if (!media) return;

    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این رسانه را حذف کنید؟"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteMedia(media._id);

      router.push("/dashboard/media");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "حذف رسانه با مشکل مواجه شد."
      );
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-6 lg:p-8">
        <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />

        <div className="mt-8 h-[500px] animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  if (error || !media) {
    return (
      <div className="mx-auto max-w-4xl p-6 lg:p-8">
        <div
          dir="rtl"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
        >
          {error || "رسانه مورد نظر پیدا نشد."}
        </div>

        <Link
          href="/dashboard/media"
          dir="rtl"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
        >
          <ArrowLeft size={16} />
          بازگشت به رسانه‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-8">
      <div className="mb-8">
       <div className="w-full flex justify-end">
       <Link
          href="/dashboard/media"
          dir="rtl"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          بازگشت به رسانه‌ها
        </Link>
       </div>

        <h1
          dir="rtl"
          className="text-2xl font-bold text-gray-900"
        >
          جزئیات رسانه
        </h1>

        <p
          dir="rtl"
          className="mt-1 text-sm text-gray-500"
        >
          اطلاعات مربوط به این رسانه را مشاهده کنید.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex min-h-[400px] items-center justify-center bg-gray-50 p-8">
          <Image
            width={200}
            height={200}
            src={media.url}
            alt="رسانه"
            className="max-h-[500px] max-w-full object-contain"
          />
        </div>

        <div className="space-y-6 border-t border-gray-200 p-6">
          <div>
            <p
              dir="rtl"
              className="mb-2 text-sm font-medium text-gray-500"
            >
              شناسه رسانه
            </p>

            <p
              dir="ltr"
              className="break-all rounded-lg bg-gray-50 p-3 font-mono text-sm text-gray-700"
            >
              {media._id}
            </p>
          </div>

          <div>
            <p
              dir="rtl"
              className="mb-2 text-sm font-medium text-gray-500"
            >
              آدرس تصویر
            </p>

            <p
              dir="ltr"
              className="break-all rounded-lg bg-gray-50 p-3 text-sm text-gray-700"
            >
              {media.url}
            </p>
          </div>

          <div>
            <p
              dir="rtl"
              className="mb-2 text-sm font-medium text-gray-500"
            >
              تاریخ ایجاد
            </p>

            <p
              dir="ltr"
              className="text-sm text-gray-700"
            >
              {new Date(media.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p
              dir="rtl"
              className="mb-2 text-sm font-medium text-gray-500"
            >
              آخرین بروزرسانی
            </p>

            <p
              dir="ltr"
              className="text-sm text-gray-700"
            >
              {new Date(media.updatedAt).toLocaleString()}
            </p>
          </div>

          <div
            dir="rtl"
            className="flex flex-wrap gap-3 pt-2"
          >
            <a
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <ExternalLink size={17} />
              باز کردن تصویر
            </a>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={17} />
              {deleting ? "در حال حذف..." : "حذف"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}