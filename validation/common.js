import { z } from "zod";

export const objectIdSchema = z
  .string({ required_error: "شناسه الزامی است", invalid_type_error: "شناسه باید رشته باشد" })
  .regex(/^[0-9a-fA-F]{24}$/, "شناسه وارد شده معتبر نمی‌باشد");
