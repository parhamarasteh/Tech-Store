"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  signInSchema,
} from "../../validation/auth";
import z from "zod";
import { signIn } from "../../services/auth.service";

type SignInFormData = z.infer<typeof signInSchema>;

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInFormData) {
    try {
      const result = await signIn(data);

      console.log("LOGIN:", result);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
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
          <p
            dir="rtl"
            className="text-sm text-red-500"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            dir="rtl"
            className="block text-sm font-medium text-gray-900"
          >
            رمز عبور
          </label>

          <a
            href="#"
            dir="rtl"
            className="text-xs font-medium text-gray-600 hover:text-black"
          >
            رمز عبور را فراموش کرده‌اید؟
          </a>
        </div>

        <input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          {...register("password")}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
            errors.password
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-200 focus:border-black focus:ring-gray-100"
          }`}
        />

        {errors.password && (
          <p
            dir="rtl"
            className="text-sm text-red-500"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "در حال ورود..." : "ورود"}
      </button>
    </form>
  );
}