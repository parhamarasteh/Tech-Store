"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema } from "../../validation/auth";
import z from "zod";
import { signUp } from "../../services/auth.service";
import { useRouter } from "next/navigation";

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  async function onSubmit(data: SignUpFormData) {
    try {
      const result = await signUp(data);
      console.log(result);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="name"
          dir="rtl"
          className="block text-sm font-medium text-gray-900"
        >
          نام و نام خانوادگی
        </label>

        <input
          id="name"
          type="text"
          placeholder="علی رضایی"
          autoComplete="name"
          {...register("name")}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
            errors.name
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-200 focus:border-black focus:ring-gray-100"
          }`}
        />

        {errors.name && (
          <p dir="rtl" className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          dir="rtl"
          className="block text-sm font-medium text-gray-900"
        >
          آدرس ایمیل
        </label>

        <input
          id="email"
          type="email"
          placeholder="ali@example.com"
          autoComplete="email"
          {...register("email")}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-200 focus:border-black focus:ring-gray-100"
          }`}
        />

        {errors.email && (
          <p dir="rtl" className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          dir="rtl"
          className="block text-sm font-medium text-gray-900"
        >
          رمز عبور
        </label>

        <input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("password")}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
            errors.password
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-200 focus:border-black focus:ring-gray-100"
          }`}
        />

        {errors.password && (
          <p dir="rtl" className="text-sm text-red-500">
            {errors.password.message}
          </p>
        )}

        {!errors.password && (
          <p dir="rtl" className="text-xs text-gray-500">
            رمز عبور باید حداقل 6 کاراکتر باشد.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "در حال ایجاد حساب..." : "ایجاد حساب کاربری"}
      </button>

      <p dir="rtl" className="text-center text-xs leading-5 text-gray-500">
        با ایجاد حساب کاربری، شما با{" "}
        <a
          href="#"
          className="font-medium text-gray-900 underline underline-offset-2"
        >
          قوانین استفاده
        </a>{" "}
        و{" "}
        <a
          href="#"
          className="font-medium text-gray-900 underline underline-offset-2"
        >
          حریم خصوصی
        </a>{" "}
        ما موافقت می‌کنید.
      </p>
    </form>
  );
}
