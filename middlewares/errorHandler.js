import env from "../config/env.js";
import { HTTP_STATUS, MESSAGES } from "../constants/http.js";
import AppError from "../utils/appError.js";

/**
 * Global error handling middleware for Express
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || MESSAGES.INTERNAL_ERROR;
  let errors = err.errors || null;

  // Handle Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    message = `مقدار وارد شده برای فیلد ${err.path} نامعتبر است`;
  }

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    const field = Object.keys(err.keyValue || {})[0] || "فیلد";
    const value = err.keyValue ? err.keyValue[field] : "";
    message = `مقداری با این ${field} (${value}) قبلاً ثبت شده است`;
  }

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    const validationErrors = Object.values(err.errors || {}).map((e) => e.message);
    message = "خطا در اعتبارسنجی داده‌ها";
    errors = validationErrors;
  }

  // Handle JSON parsing syntax error
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "فرمت JSON ارسالی نامعتبر است";
  }

  // Log non-operational errors in development/production
  if (!err.isOperational && statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    console.error("💥 UNHANDLED SERVER ERROR:", err);
  }

  const responsePayload = {
    success: false,
    message,
    ...(errors && { errors }),
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  };

  return res.status(statusCode).json(responsePayload);
}
