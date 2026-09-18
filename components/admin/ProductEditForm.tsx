"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import { useBrands } from "../../hooks/useBrands";
import { useMedia } from "../../hooks/useMedia";
import { Product } from "../../types/product";
import {
  getProduct,
  updateProduct,
} from "../../services/product.service";

import { updateProductSchema } from "../../validation/product";
import Image from "next/image";

interface ProductEditFormProps {
  id: string;
}

export default function ProductEditForm({
  id,
}: ProductEditFormProps) {
  const router = useRouter();

  const {
    categories,
    loading: categoriesLoading,
  } = useCategories();

  const {
    brands,
    loading: brandsLoading,
  } = useBrands();

  const {
    media,
    loading: mediaLoading,
  } = useMedia();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("0");

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [selectedMedia, setSelectedMedia] =
    useState<string[]>([]);

  const [loadingProduct, setLoadingProduct] =
    useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadProduct() {
      try {
        setLoadingProduct(true);
        setError(null);

        const data = await getProduct(id);

        if (!mounted) return;

        setProduct(data);

        setName(data?.name);
        setPrice(String(data.price));
        setSale(String(data.sale));

        setCategory(
          data.category?._id || ""
        );

        setBrand(
          data.brand?._id || ""
        );

        setSelectedMedia(
          data.media?.map(
            (item) => item._id
          ) || []
        );
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "بارگذاری محصول با مشکل مواجه شد."
          );
        }
      } finally {
        if (mounted) {
          setLoadingProduct(false);
        }
      }
    }

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [id]);

  function toggleMedia(mediaId: string) {
    setSelectedMedia((current) =>
      current.includes(mediaId)
        ? current.filter(
            (item) => item !== mediaId
          )
        : [...current, mediaId]
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    const validation =
      updateProductSchema.safeParse({
        name: name.trim(),
        price: Number(price),
        sale: Number(sale),
        category,
        brand,
        media: selectedMedia,
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

      await updateProduct(
        id,
        validation.data
      );

      router.push(
        "/dashboard/products"
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ویرایش محصول با مشکل مواجه شد."
      );
    } finally {
      setSaving(false);
    }
  }

  const loading =
    loadingProduct ||
    categoriesLoading ||
    brandsLoading ||
    mediaLoading;

  if (loadingProduct) {
    return (
      <div
        dir="rtl"
        className="mx-auto max-w-5xl p-6 lg:p-8"
      >
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            در حال بارگذاری محصول...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        dir="rtl"
        className="mx-auto max-w-5xl p-6 lg:p-8"
      >
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-600">
            {error || "محصول پیدا نشد."}
          </p>
        </div>

        <div className="w-full flex justify-end"> 
        <Link
          href="/dashboard/products"
          className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-black"
        >
          بازگشت به محصولات
          <ArrowLeft
            size={16}
          />
        </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="mx-auto max-w-5xl p-6 lg:p-8"
    >
      <div className="mb-8">
      <div className="w-full flex justify-end"> 
        <Link
          href="/dashboard/products"
          className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-black"
        >
          بازگشت به محصولات
          <ArrowLeft
            size={16}
          />
        </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          ویرایش محصول
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          اطلاعات محصول خود را به‌روزرسانی کنید.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            اطلاعات پایه
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                نام محصول
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="مثلاً آیفون 17 پرو"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                قیمت
              </label>

              <input
                id="price"
                type="number"
                min="0"
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value)
                }
                placeholder="50000000"
                dir="ltr"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div>
              <label
                htmlFor="sale"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                تخفیف (٪)
              </label>

              <input
                id="sale"
                type="number"
                min="0"
                max="100"
                value={sale}
                onChange={(event) =>
                  setSale(event.target.value)
                }
                placeholder="10"
                dir="ltr"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            دسته‌بندی و برند
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                دسته‌بندی
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                disabled={loading}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 disabled:bg-gray-100"
              >
                <option value="">
                  انتخاب دسته‌بندی
                </option>

                {categories.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="brand"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                برند
              </label>

              <select
                id="brand"
                value={brand}
                onChange={(event) =>
                  setBrand(event.target.value)
                }
                disabled={loading}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 disabled:bg-gray-100"
              >
                <option value="">
                  انتخاب برند
                </option>

                {brands.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              تصاویر محصول
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              تصاویر مورد نظر برای این محصول را انتخاب کنید.
            </p>
          </div>

          {mediaLoading ? (
            <div className="mt-6 rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-500">
              در حال بارگذاری رسانه‌ها...
            </div>
          ) : media.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <ImageIcon
                size={32}
                className="mx-auto text-gray-400"
              />

              <p className="mt-3 text-sm text-gray-500">
                هیچ رسانه‌ای موجود نیست.
              </p>

              <Link
                href="/dashboard/media/create"
                className="mt-4 inline-flex rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
              >
                افزودن رسانه
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {media.map((item) => {
                const selected =
                  selectedMedia.includes(
                    item._id
                  );

                return (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() =>
                      toggleMedia(item._id)
                    }
                    className={`overflow-hidden rounded-xl border-2 text-right transition ${
                      selected
                        ? "border-black"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="relative aspect-square bg-gray-50">
                      <Image
                        fill
                        src={item.url}
                        alt="رسانه محصول"
                        className="object-contain p-3"
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>

                    <div className="flex items-center gap-2 p-3">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border ${
                          selected
                            ? "border-black bg-black text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {selected && "✓"}
                      </div>

                      <span className="truncate text-xs text-gray-500">
                        {selected
                          ? "انتخاب شده"
                          : "انتخاب تصویر"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <div className="flex justify-end gap-3">
          <Link
            href="/dashboard/products"
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            انصراف
          </Link>

          <button
            type="submit"
            disabled={saving || loading}
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