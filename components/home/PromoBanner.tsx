import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 px-8 py-16 text-white sm:px-14 lg:px-20 lg:py-20">

          <div className="relative z-10 max-w-xl">

            <p
              dir="rtl"
              className="text-xs font-semibold tracking-[0.2em] text-zinc-500"
            >
              پیشنهاد ویژه
            </p>

            <h2
              dir="rtl"
              className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl"
            >
              تجهیزات خود را ارتقا دهید.
            </h2>

            <p
              dir="rtl"
              className="mt-5 text-sm leading-6 text-zinc-400 sm:text-base"
            >
              جدیدترین محصولات تکنولوژی را کشف کنید و برای
              سفارش‌های بالای 70 میلیون تومان از ارسال رایگان بهره‌مند شوید.
            </p>

            <Link
              href="/products"
              dir="rtl"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              شروع خرید
              <ArrowLeft className="h-4 w-4" />
            </Link>

          </div>

          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full border border-zinc-800" />

          <div className="absolute -bottom-32 left-20 h-96 w-96 rounded-full border border-zinc-800" />

        </div>

      </div>
    </section>
  );
}
