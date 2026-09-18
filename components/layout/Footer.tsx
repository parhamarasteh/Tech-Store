import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
                T
              </div>

              <span className="text-xl font-bold">
                Tech<span className="text-zinc-500">Store</span>
              </span>
            </Link>

            <p
              dir="rtl"
              className="mt-5 max-w-xs text-sm leading-6 text-zinc-400"
            >
              تکنولوژی مدرن برای زندگی مدرن.
            </p>
          </div>

          <div>
            <h3 dir="rtl" className="text-sm font-semibold">
              فروشگاه
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                href="/products"
                dir="rtl"
                className="block text-sm text-zinc-400 hover:text-white"
              >
                همه محصولات
              </Link>
            </div>
          </div>

          <div>
            <h3 dir="rtl" className="text-sm font-semibold">
              حساب کاربری
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                href="/auth/login"
                dir="rtl"
                className="block text-sm text-zinc-400 hover:text-white"
              >
                ورود
              </Link>

              <Link
                href="/auth/register"
                dir="rtl"
                className="block text-sm text-zinc-400 hover:text-white"
              >
                ایجاد حساب کاربری
              </Link>
            </div>
          </div>

          <div>
            <h3 dir="rtl" className="text-sm font-semibold">
              پشتیبانی
            </h3>

            <p
              dir="rtl"
              className="mt-5 text-sm leading-6 text-zinc-400"
            >
              به کمک نیاز دارید؟ با تیم پشتیبانی ما در ارتباط باشید.
            </p>

            <Link
              href="/"
              dir="rtl"
              className="mt-5 inline-block text-sm font-medium text-white hover:underline"
            >
              تماس با ما ←
            </Link>
          </div>

        </div>

        <div className="mt-16 border-t border-zinc-800 pt-8 text-center">
          <p
            dir="rtl"
            className="text-xs text-zinc-500"
          >
            © {new Date().getFullYear()} TechStore. تمامی حقوق محفوظ است.
          </p>

          <p
            dir="rtl"
            className="mt-3 text-xs text-zinc-600"
          >
            طراحی و توسعه توسط{" "}
            <span className="font-medium text-zinc-400">
              پرهام آراسته
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
}