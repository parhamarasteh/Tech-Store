import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string({ required_error: "نام الزامی است", invalid_type_error: "نام باید رشته باشد" })
    .trim()
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),
  email: z
    .string({ required_error: "ایمیل الزامی است" })
    .trim()
    .toLowerCase()
    .email("لطفاً یک آدرس ایمیل معتبر وارد کنید"),
  password: z
    .string({ required_error: "رمز عبور الزامی است" })
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .max(100, "رمز عبور نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
});

export const signInSchema = z.object({
  email: z
    .string({ required_error: "ایمیل الزامی است" })
    .trim()
    .toLowerCase()
    .email("لطفاً یک آدرس ایمیل معتبر وارد کنید"),
  password: z
    .string({ required_error: "رمز عبور الزامی است" })
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .max(100, "رمز عبور نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
});
