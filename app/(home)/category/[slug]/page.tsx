import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProductsByCategory } from "../../../../services/product.service";
import { Product } from "../../../../types/product";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const categoryName = decodeURIComponent(slug);

  let category;

  try {
    const result = await getProductsByCategory(categoryName);
    category = result;
  } catch {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-5">
        <div dir="rtl" className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900">
            دسته‌بندی پیدا نشد
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            نتوانستیم این دسته‌بندی را پیدا کنیم.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            بازگشت به محصولات
          </Link>
        </div>
      </main>
    );
  }

  const products = category.products || [];

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex justify-end w-full">
            <Link
              href="/products"
              dir="rtl"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-black"
            >
              همه محصولات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center">
            {category.image && (
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl bg-zinc-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div dir="rtl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                دسته‌بندی
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">
                {category.name}
              </h1>

              <p className="mt-3 text-sm text-zinc-500">
                {products.length} محصول
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products?.map((product: Product) => {
              const image = product.media?.[0]?.url;

              return (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="group min-w-0"
                >
                  <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">
                    <div className="relative h-[280px] overflow-hidden bg-zinc-50">
                      {image ? (
                        <div className="absolute inset-0 flex items-center justify-center p-10">
                          <Image
                            src={image}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="flex h-40 w-32 items-center justify-center rounded-2xl bg-zinc-900">
                            <span className="text-xs font-semibold tracking-[0.25em] text-white">
                              TECH
                            </span>
                          </div>
                        </div>
                      )}

                      {product.sale > 0 && (
                        <span
                          dir="rtl"
                          className="absolute right-4 top-4 rounded-full bg-black px-3 py-1.5 text-[10px] font-semibold text-white"
                        >
                          {product.sale}% تخفیف
                        </span>
                      )}
                    </div>

                    <div dir="rtl" className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-xs text-zinc-400">
                          {product.category?.name || category.name}
                        </p>

                        {product.brand?.name && (
                          <p className="shrink-0 text-xs text-zinc-400">
                            {product.brand.name}
                          </p>
                        )}
                      </div>

                      <h2 className="mt-2 min-h-[3rem] line-clamp-2 font-semibold leading-6 text-zinc-900">
                        {product.name}
                      </h2>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-semibold text-zinc-900">
                          {product.price.toLocaleString()} تومان
                        </span>

                        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-zinc-400 transition group-hover:text-zinc-900">
                          مشاهده
                          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div
            dir="rtl"
            className="rounded-3xl border border-dashed border-zinc-300 bg-white p-16 text-center"
          >
            <h2 className="text-lg font-semibold text-zinc-900">
              محصولی وجود ندارد
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              هنوز محصولی در این دسته‌بندی ثبت نشده است.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
