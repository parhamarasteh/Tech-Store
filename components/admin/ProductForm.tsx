"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { addProductSchema } from "../../validation/product";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useBrands } from "../../hooks/useBrands";
import { useMedia } from "../../hooks/useMedia";
import Image from "next/image";

export default function ProductForm() {
  const router = useRouter();

  const { addProduct } = useProducts();

  const { categories, loading: categoriesLoading } = useCategories();

  const { brands, loading: brandsLoading } = useBrands();

  const { media, loading: mediaLoading } = useMedia();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("0");

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleMedia(id: string) {
    setSelectedMedia((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const selectedCategory = category || categories[0]?._id || "";

    const selectedBrand = brand || brands[0]?._id || "";

    const result = addProductSchema.safeParse({
      name,
      price: Number(price),
      sale: Number(sale),
      category: selectedCategory,
      brand: selectedBrand,
      media: selectedMedia,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      setSaving(true);

      await addProduct({
        name: result.data.name,
        price: result.data.price,
        sale: result.data.sale,
        media: result.data.media,
        category: result.data.category,
        brand: result.data.brand,
      });

      router.push("/dashboard/products");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "ایجاد محصول با مشکل مواجه شد."
      );
    } finally {
      setSaving(false);
    }
  }

  const loading = categoriesLoading || brandsLoading || mediaLoading;

  return (
    <div dir="rtl" className="mx-auto max-w-5xl p-6 lg:p-8">
      <div className="mb-8">

        <div className="w-full flex justify-end">
        <Link
          href="/dashboard/products"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          بازگشت به محصولات
          <ArrowLeft size={16}  />
        </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">افزودن محصول</h1>

        <p className="mt-1 text-sm text-gray-500">
          یک محصول جدید برای فروشگاه خود ایجاد کنید.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-sm text-gray-500">در حال بارگذاری اطلاعات...</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                نام محصول
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="گوشی موبایل گلکسی S24"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  قیمت
                </label>

                <input
                  id="price"
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="50000000"
                  dir="ltr"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
                />

                <p className="mt-1 text-xs text-gray-400">قیمت به تومان</p>
              </div>

              <div>
                <label
                  htmlFor="sale"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  درصد تخفیف
                </label>

                <input
                  id="sale"
                  type="number"
                  min="0"
                  max="100"
                  value={sale}
                  onChange={(event) => setSale(event.target.value)}
                  placeholder="10"
                  dir="ltr"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
                />

                <p className="mt-1 text-xs text-gray-400">بین ۰ تا ۱۰۰ درصد</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  دسته‌بندی
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
                >
                  <option value="">انتخاب دسته‌بندی</option>

                  {categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="brand"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  برند
                </label>

                <select
                  id="brand"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-gray-100"
                >
                  <option value="">انتخاب برند</option>

                  {brands.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="mb-3">
                <h2 className="text-sm font-medium text-gray-900">
                  تصاویر محصول
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  حداقل یک تصویر انتخاب کنید.
                </p>
              </div>

              {media.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
                  <p className="text-sm text-gray-500">
                    هنوز هیچ رسانه‌ای وجود ندارد.
                  </p>

                  <Link
                    href="/dashboard/media/create"
                    className="mt-4 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    افزودن رسانه
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {media.map((item) => {
                    const selected = selectedMedia.includes(item._id);

                    return (
                      <button
                        key={item._id}
                        type="button"
                        onClick={() => toggleMedia(item._id)}
                        className={`overflow-hidden rounded-xl border-2 bg-gray-50 transition ${
                          selected
                            ? "border-black"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={item.url}
                            alt="تصویر محصول"
                            fill
                            className="object-contain p-3"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </div>

                        <div className="border-t border-gray-100 bg-white px-3 py-2 text-right">
                          <p className="truncate text-xs text-gray-500">
                            {selected ? "انتخاب شده" : "انتخاب تصویر"}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-start">
            <button
              type="button"
              onClick={() => router.push("/dashboard/products")}
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={saving || loading}
              className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "در حال ایجاد..." : "ایجاد محصول"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
