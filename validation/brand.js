import { z } from "zod";

export const addBrandSchema = z.object({
  name: z
    .string({ required_error: "نام برند الزامی است" })
    .trim()
    .min(1, "نام برند نمی‌تواند خالی باشد")
    .max(100, "نام برند نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
  logo: z
    .string({ required_error: "لوگوی برند الزامی است" })
    .trim()
    .min(1, "لوگو نمی‌تواند خالی باشد")
    .url("لطفاً یک آدرس معتبر برای لوگو وارد کنید"),
});

export const updateBrandSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "نام برند نمی‌تواند خالی باشد")
      .max(100, "نام برند نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد")
      .optional(),
    logo: z
      .string()
      .trim()
      .min(1, "لوگو نمی‌تواند خالی باشد")
      .url("لطفاً یک آدرس معتبر برای لوگو وارد کنید")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "حداقل یکی از فیلدهای نام یا لوگو برای به‌روزرسانی الزامی است",
  });
