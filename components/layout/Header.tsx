"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { useCartStore } from "../../store/cart.store";

export default function Header() {
  const router = useRouter();

  const {
    isAuthenticated,
  } = useAuth();

  const itemCount = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  const [query, setQuery] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = query.trim();

    if (!value) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-5 lg:px-8">

        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight text-zinc-900"
        >
          TECH<span className="text-zinc-400">STORE</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">

          <Link
            href="/"
            dir="rtl"
            className="text-sm font-medium text-zinc-600 transition hover:text-black"
          >
            خانه
          </Link>

          <Link
            href="/products"
            dir="rtl"
            className="text-sm font-medium text-zinc-600 transition hover:text-black"
          >
            محصولات
          </Link>

          <Link
            href="/category"
            dir="rtl"
            className="text-sm font-medium text-zinc-600 transition hover:text-black"
          >
            دسته‌بندی‌ها
          </Link>

        </nav>

        <form
          onSubmit={handleSearch}
          className="ml-auto hidden w-full max-w-sm md:block"
        >
          <div className="relative">

            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              dir="rtl"
              placeholder="جستجوی محصولات..."
              className="h-11 w-full rounded-full border border-zinc-200 bg-zinc-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
            />

          </div>
        </form>

        <div className="flex shrink-0 items-center gap-2">

          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100"
            aria-label="سبد خرید"
          >
            <ShoppingBag className="h-5 w-5" />

            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          
            <Link
              href={
                isAuthenticated
                  ? "/dashboard"
                  : "/auth/login"
              }
              className={
                isAuthenticated
                  ? "flex h-10 items-center justify-center rounded-full px-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-black"
                  : "flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100"
              }
              aria-label={
                isAuthenticated
                  ? "داشبورد"
                  : "ورود"
              }
            >
              {isAuthenticated ? (
                <span dir="rtl">داشبورد</span>
              ) : (
                <User className="h-5 w-5" />
              )}
            </Link>
          

        </div>

      </div>
    </header>
  );
}