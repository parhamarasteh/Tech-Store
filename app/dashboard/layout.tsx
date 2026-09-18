"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Boxes,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Tags,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "../../services/auth.service";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);

      await signOut();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "خروج از حساب با مشکل مواجه شد."
      );
    } finally {
      setLoggingOut(false);
    }
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100"
          aria-label="باز کردن منوی داشبورد"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-zinc-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
            <Boxes className="h-4 w-4" />
          </div>

          <span>Tech Store</span>
        </Link>

        <div className="w-10" />
      </header>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="بستن منوی کناری"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r
          border-zinc-200 bg-white transition-transform duration-300
          lg:w-64 lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-20 items-center justify-between border-b border-zinc-100 px-6">
          <Link
            href="/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3 font-bold text-zinc-900"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              <Boxes className="h-5 w-5" />
            </div>

            <span>Tech Store</span>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100 lg:hidden"
            aria-label="بستن منوی داشبورد"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <p
            dir="rtl"
            className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            نمای کلی
          </p>

          <SidebarLink
            href="/dashboard"
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="داشبورد"
            active={pathname === "/dashboard"}
            onClick={closeSidebar}
          />

          <p
            dir="rtl"
            className="mb-3 mt-7 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            فروشگاه
          </p>

          <SidebarLink
            href="/dashboard/products"
            icon={<Package className="h-5 w-5" />}
            label="محصولات"
            active={pathname.startsWith("/dashboard/products")}
            onClick={closeSidebar}
          />

          <SidebarLink
            href="/dashboard/categories"
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="دسته‌بندی‌ها"
            active={pathname.startsWith("/dashboard/categories")}
            onClick={closeSidebar}
          />

          <SidebarLink
            href="/dashboard/brands"
            icon={<Tags className="h-5 w-5" />}
            label="برندها"
            active={pathname.startsWith("/dashboard/brands")}
            onClick={closeSidebar}
          />

          <SidebarLink
            href="/dashboard/media"
            icon={<ImageIcon className="h-5 w-5" />}
            label="رسانه‌ها"
            active={pathname.startsWith("/dashboard/media")}
            onClick={closeSidebar}
          />

          <p
            dir="rtl"
            className="mb-3 mt-7 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400"
          >
            مدیریت
          </p>

          <SidebarLink
            href="/dashboard/orders"
            icon={<ShoppingCart className="h-5 w-5" />}
            label="سفارش‌ها"
            active={pathname.startsWith("/dashboard/orders")}
            onClick={closeSidebar}
          />

          <SidebarLink
            href="/dashboard/users"
            icon={<Users className="h-5 w-5" />}
            label="کاربران"
            active={pathname.startsWith("/dashboard/users")}
            onClick={closeSidebar}
          />

          <SidebarLink
            href="/dashboard/settings"
            icon={<Settings className="h-5 w-5" />}
            label="تنظیمات"
            active={pathname.startsWith("/dashboard/settings")}
            onClick={closeSidebar}
          />
        </nav>

        <div className="space-y-2 border-t border-zinc-100 p-4">
          <Link
            href="/"
            onClick={closeSidebar}
            dir="rtl"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            <ArrowLeft className="h-5 w-5" />
            بازگشت به فروشگاه
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            dir="rtl"
            className="flex w-full items-center gap-3 rounded-xl bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut className="h-5 w-5" />

            {loggingOut ? "در حال خروج..." : "خروج از حساب"}
          </button>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-64">{children}</main>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      dir="rtl"
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
        active
          ? "bg-zinc-900 text-white"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}