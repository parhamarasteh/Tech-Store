"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { getBrand, updateBrand } from "../../services/brand.service";
import { updateBrandSchema } from "../../validation/brand";
import Image from "next/image";

interface BrandEditFormProps {
  id: string;
}

export default function BrandEditForm({
  id,
}: BrandEditFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadBrand() {
      try {
        const result = await getBrand(id);

        if (mounted) {
          setName(result.name);
          setLogo(result.logo);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "بارگذاری برند با مشکل مواجه شد."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadBrand();

    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    const validation = updateBrandSchema.safeParse({
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

      await updateBrand(id, validation.data);

      router.push("/dashboard/brands");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ویرایش برند با مشکل مواجه شد."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div
        dir="rtl"
        className="mx-auto max-w-3xl p-6 lg:p-8"
      >
        <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />

        <div className="mt-8 h-96 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  if (error && !name) {
    return (
      <div
        dir="rtl"
        className="mx-auto max-w-3xl p-6 lg:p-8"
      >
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>

        <Link
          href="/dashboard/brands"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
        >
          <ArrowLeft
            size={16}
            className="rotate-180"
          />
          بازگشت به برندها
        </Link>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="mx-auto max-w-3xl p-6 lg:p-8"
    >
      <div className="mb-8">
        <div className="flex w-full justify-start">
          <Link
            href="/dashboard/brands"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            <ArrowLeft
              size={16}
              className="rotate-180"
            />
            بازگشت به برندها
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          ویرایش برند
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          اطلاعات برند را به‌روزرسانی کنید.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              نام برند
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="مثلاً اپل"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label
              htmlFor="logo"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              آدرس لوگو
            </label>

            <input
              id="logo"
              type="url"
              value={logo}
              onChange={(event) =>
                setLogo(event.target.value)
              }
              dir="ltr"
              placeholder="https://example.com/logo.webp"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
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
                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <span className="text-sm text-gray-400">
                  لوگویی انتخاب نشده است
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
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
            {saving
              ? "در حال ذخیره..."
              : "ذخیره تغییرات"}
          </button>
        </div>
      </form>
    </div>
  );
}