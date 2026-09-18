import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getSaleProducts } from "../../../services/product.service";
import { Product } from "../../../types/product";

export default async function SalePage() {
  let products: Product[] = [];

  try {
    const result = await getSaleProducts();
    products = result.data;
  } catch {
    products = [];
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <div dir="rtl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              پیشنهاد ویژه
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              محصولات تخفیف‌دار
            </h1>

            <p className="mt-3 text-sm text-zinc-500 sm:text-base">
              محصولات منتخب با قیمت ویژه را مشاهده کنید.
            </p>
          </div>

          <Link
            href="/products"
            dir="rtl"
            className="hidden items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-black sm:inline-flex"
          >
            همه محصولات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div
            dir="rtl"
            className="rounded-3xl border border-zinc-200 bg-white px-6 py-20 text-center"
          >
            <h2 className="text-xl font-semibold text-zinc-900">
              محصول تخفیف‌داری موجود نیست
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              در حال حاضر محصولی با تخفیف در فروشگاه وجود ندارد.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              مشاهده همه محصولات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <div
              dir="rtl"
              className="mb-6 text-sm text-zinc-500"
            >
              {products.length} محصول تخفیف‌دار
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => {
                const discountedPrice =
                  product.price -
                  (product.price * product.sale) / 100;

                const image = product.media?.[0]?.url;

                return (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative h-[280px] overflow-hidden bg-zinc-50">
                      {image ? (
                        <Image
                          src={image}
                          alt={product.name}
                          fill
                          className="object-contain p-6 transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div
                          dir="rtl"
                          className="flex h-full items-center justify-center text-sm text-zinc-400"
                        >
                          بدون تصویر
                        </div>
                      )}

                      <span
                        dir="rtl"
                        className="absolute right-4 top-4 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        {product.sale}% تخفیف
                      </span>
                    </div>

                    <div className="p-5">
                      <p
                        dir="rtl"
                        className="text-xs text-zinc-400"
                      >
                        {product.category?.name || "محصول"}
                      </p>

                      <h2
                        dir="rtl"
                        className="mt-2 line-clamp-2 min-h-[48px] text-sm font-semibold leading-6 text-zinc-900"
                      >
                        {product.name}
                      </h2>

                      <div
                        dir="rtl"
                        className="mt-5 flex items-end justify-between gap-3"
                      >
                        <div>
                          <p className="text-xs text-zinc-400 line-through">
                            {product.price.toLocaleString("fa-IR")} تومان
                          </p>

                          <p className="mt-1 text-base font-bold text-zinc-900">
                            {discountedPrice.toLocaleString("fa-IR")} تومان
                          </p>
                        </div>

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 transition group-hover:bg-black group-hover:text-white">
                          <ArrowLeft className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 sm:hidden">
              <Link
                href="/products"
                dir="rtl"
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                مشاهده همه محصولات
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}