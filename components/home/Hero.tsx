"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-50px)] overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-zinc-700/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="max-w-2xl">
            <div
              dir="rtl"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300"
            >
              <Sparkles className="h-4 w-4" />
              تکنولوژی جدید، تجربه‌ای بهتر
            </div>

            <h1
              dir="rtl"
              className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              تکنولوژی
              <br />
              <span className="text-zinc-400">
                ساده‌تر از همیشه.
              </span>
            </h1>

            <p
              dir="rtl"
              className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg"
            >
              جدیدترین گوشی‌ها، لپ‌تاپ‌ها، ایرپاد، ساعت‌های هوشمند و
              لوازم دیجیتال روز را پیدا کنید و انتخابی مطمئن و هوشمندانه
              داشته باشید.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                dir="rtl"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                مشاهده محصولات
                <ArrowLeft className="h-4 w-4" />
              </Link>

              <Link
                href="/category"
                dir="rtl"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                مشاهده دسته‌بندی‌ها
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-[520px]">
              <div className="absolute inset-10 rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-sm" />

              <div className="absolute left-[15%] top-[18%] w-[70%] -rotate-6">
                <div className="rounded-2xl border border-white/10 bg-zinc-800 p-2 shadow-2xl">
                  <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-zinc-700 via-zinc-900 to-black" />
                </div>

                <div className="mx-auto h-3 w-[85%] rounded-b-xl bg-zinc-700" />
              </div>

              <div className="absolute bottom-[12%] right-[8%] w-[27%] rotate-12">
                <div className="rounded-[2rem] border-4 border-zinc-700 bg-black p-2 shadow-2xl">
                  <div className="aspect-[9/18] rounded-[1.5rem] bg-gradient-to-br from-zinc-600 via-zinc-900 to-black" />
                </div>
              </div>

              <div className="absolute right-[8%] top-[8%] flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur">
                <Sparkles className="h-7 w-7 text-white" />
              </div>

              <div className="absolute left-0 top-1/2 h-3 w-3 rounded-full bg-white/40" />
              <div className="absolute bottom-8 left-1/4 h-2 w-2 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
