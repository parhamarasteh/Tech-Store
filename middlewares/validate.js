import { HTTP_STATUS } from "../constants/http.js";
import flattenZodError from "../lib/flatten-error.js";

/**
 * Creates an Express middleware for validating request data against a Zod schema
 * @param {import('zod').ZodSchema} schema - The Zod schema to validate against
 * @param {'body' | 'query' | 'params'} [source='body'] - The property of req to validate
 * @returns {import('express').RequestHandler}
 */
export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const { errors, fieldErrors } = flattenZodError(result.error);
      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: "اطلاعات ارسالی نامعتبر است",
        errors,
        fieldErrors,
      });
    }

    // Replace req[source] with parsed & transformed data
    req[source] = result.data;
    next();
  };
};

export default validate;
