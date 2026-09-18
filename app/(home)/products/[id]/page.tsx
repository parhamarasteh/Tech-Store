import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProduct } from "../../../../services/product.service";
import AddToCartButton from "../../../../components/cart/AddToCartButton";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  let product;

  try {
    const result = await getProduct(id);
    product = result;
  } catch {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-5">
        <div dir="rtl" className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900">محصول پیدا نشد</h1>

          <p className="mt-2 text-sm text-zinc-500">
            محصولی که به دنبال آن هستید وجود ندارد.
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

  const image = product.media?.[0]?.url;

  const discountedPrice =
    product.sale > 0
      ? product.price - (product.price * product.sale) / 100
      : product.price;

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex max-w-7xl justify-end px-5 pt-8 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-black"
        >
                    بازگشت به محصولات
          <ArrowLeft className="h-4 w-4" /> 

        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="relative flex h-[500px] items-center justify-center overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-10">
              {image ? (
                <Image
                  src={image}
                  alt={product.name}
                  width={700}
                  height={700}
                  className="h-full w-full object-contain"
                  priority
                />
              ) : (
                <div className="flex h-64 w-48 items-center justify-center rounded-3xl bg-zinc-900">
                  <span className="text-sm font-semibold tracking-[0.25em] text-white">
                    TECH
                  </span>
                </div>
              )}

              {product.sale > 0 && (
                <span
                  dir="rtl"
                  className="absolute left-6 top-6 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white"
                >
                  {product.sale}% تخفیف
                </span>
              )}
            </div>

            {product.media && product.media.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.media.slice(0, 4).map((media) => (
                  <div
                    key={media._id}
                    className="relative h-24 overflow-hidden rounded-2xl border border-zinc-200 bg-white"
                  >
                    <Image
                      src={media.url}
                      alt={product.name}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div dir="rtl" className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3">
              {product.category?.name && (
                <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600">
                  {product.category.name}
                </span>
              )}

              {product.brand?.name && (
                <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600">
                  {product.brand.name}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-8">
              {product.sale > 0 && (
                <p className="text-sm text-zinc-400 line-through">
                  {product.price.toLocaleString()} تومان
                </p>
              )}

              <div className="mt-1 flex items-end gap-3">
                <span className="text-3xl font-bold text-zinc-900">
                  {discountedPrice.toLocaleString()} تومان
                </span>

                {product.sale > 0 && (
                  <span className="mb-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                    {product.sale}% تخفیف
                  </span>
                )}
              </div>
            </div>

            <div className="my-8 h-px bg-zinc-200" />

            {product.brand?.name && (
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-zinc-500">برند</span>

                <span className="text-sm font-semibold text-zinc-900">
                  {product.brand.name}
                </span>
              </div>
            )}

            {product.category?.name && (
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-zinc-500">دسته‌بندی</span>

                <span className="text-sm font-semibold text-zinc-900">
                  {product.category.name}
                </span>
              </div>
            )}

            <AddToCartButton product={product} />

            <p className="mt-4 text-center text-xs text-zinc-400">
              پرداخت امن • ارسال سریع
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
