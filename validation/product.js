import { z } from "zod";
import { objectIdSchema } from "./common.js";

export const addProductSchema = z.object({
  name: z
    .string({ required_error: "نام محصول الزامی است" })
    .trim()
    .min(1, "نام محصول نمی‌تواند خالی باشد")
    .max(150, "نام محصول نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد"),
  price: z
    .number({ required_error: "قیمت محصول الزامی است", invalid_type_error: "قیمت باید عدد باشد" })
    .min(0, "قیمت محصول نمی‌تواند منفی باشد"),
  sale: z
    .number({ invalid_type_error: "تخفیف باید عدد باشد" })
    .min(0, "تخفیف نمی‌تواند منفی باشد")
    .max(100, "تخفیف نمی‌تواند بیشتر از ۱۰۰ درصد باشد")
    .default(0)
    .optional(),
  media: z
    .array(objectIdSchema, {
      required_error: "تصاویر محصول الزامی است",
      invalid_type_error: "فرمت شناسه تصاویر نامعتبر است",
    })
    .min(1, "حداقل یک شناسه رسانه برای محصول الزامی است"),
  category: objectIdSchema,
  brand: objectIdSchema,
});

export const updateProductSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "نام محصول نمی‌تواند خالی باشد")
      .max(150, "نام محصول نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد")
      .optional(),
    price: z
      .number({ invalid_type_error: "قیمت باید عدد باشد" })
      .min(0, "قیمت محصول نمی‌تواند منفی باشد")
      .optional(),
    sale: z
      .number({ invalid_type_error: "تخفیف باید عدد باشد" })
      .min(0, "تخفیف نمی‌تواند منفی باشد")
      .max(100, "تخفیف نمی‌تواند بیشتر از ۱۰۰ درصد باشد")
      .optional(),
    media: z
      .array(objectIdSchema)
      .min(1, "حداقل یک شناسه رسانه برای محصول الزامی است")
      .optional(),
    category: objectIdSchema.optional(),
    brand: objectIdSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "حداقل یکی از فیلدها برای به‌روزرسانی الزامی است",
  });
