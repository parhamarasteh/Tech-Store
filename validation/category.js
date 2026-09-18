import { z } from "zod";

export const addCategorySchema = z.object({
  name: z
    .string({ required_error: "نام دسته‌بندی الزامی است" })
    .trim()
    .min(1, "نام دسته‌بندی نمی‌تواند خالی باشد")
    .max(100, "نام دسته‌بندی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
  en_name: z
    .string({ required_error: "نام انگلیسی دسته‌بندی الزامی است" })
    .trim()
    .toLowerCase()
    .min(1, "نام انگلیسی دسته‌بندی نمی‌تواند خالی باشد")
    .max(100, "نام انگلیسی دسته‌بندی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
  image: z
    .string({ required_error: "تصویر دسته‌بندی الزامی است" })
    .trim()
    .min(1, "تصویر نمی‌تواند خالی باشد")
    .url("لطفاً یک آدرس معتبر برای تصویر وارد کنید"),
});

export const updateCategorySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "نام دسته‌بندی نمی‌تواند خالی باشد")
      .max(100, "نام دسته‌بندی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد")
      .optional(),
    en_name: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "نام انگلیسی دسته‌بندی نمی‌تواند خالی باشد")
      .max(100, "نام انگلیسی دسته‌بندی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد")
      .optional(),
    image: z
      .string()
      .trim()
      .min(1, "تصویر نمی‌تواند خالی باشد")
      .url("لطفاً یک آدرس معتبر برای تصویر وارد کنید")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "حداقل یکی از فیلدها برای به‌روزرسانی الزامی است",
  });
