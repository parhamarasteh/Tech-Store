import Link from "next/link";
import RegisterForm from "../../../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white">
            T
          </div>

          <h1
            dir="rtl"
            className="text-3xl font-bold tracking-tight text-gray-900"
          >
            ایجاد حساب کاربری
          </h1>

          <p
            dir="rtl"
            className="mt-2 text-sm text-gray-500"
          >
            به ما بپیوندید و خرید از محصولات مورد علاقه تکنولوژی خود را شروع کنید.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <RegisterForm />

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">
              یا
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <p
            dir="rtl"
            className="text-center text-sm text-gray-500"
          >
            قبلاً حساب کاربری دارید؟{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-gray-900 hover:underline"
            >
              ورود
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}