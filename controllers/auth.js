import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import { createSession } from "../lib/session.js";
import { HTTP_STATUS } from "../constants/http.js";
import { getAuthCookieOptions, getClearCookieOptions } from "../constants/cookie.js";
import { sendSuccess } from "../utils/response.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Register a new user
 * POST /api/auth/sign-up
 */
export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new AppError("کاربری با این ایمیل قبلاً ثبت نام کرده است", HTTP_STATUS.CONFLICT);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return sendSuccess(
    res,
    HTTP_STATUS.CREATED,
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
    "کاربر با موفقیت ساخته شد",
  );
});

/**
 * Sign in an existing user
 * POST /api/auth/sign-in
 */
export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError("ایمیل یا رمز عبور نادرست است", HTTP_STATUS.UNAUTHORIZED);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("ایمیل یا رمز عبور نادرست است", HTTP_STATUS.UNAUTHORIZED);
  }

  const userId = user._id.toString();
  const { expiresAt, session } = await createSession(userId);

  res.cookie("token", session, getAuthCookieOptions(expiresAt));

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    {
      token: session,
      authorized: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
    "ورود با موفقیت انجام شد",
  );
});

/**
 * Sign out current user
 * DELETE /api/auth/sign-out
 */
export const signOut = asyncHandler(async (req, res) => {
  res.clearCookie("token", getClearCookieOptions());

  return sendSuccess(res, HTTP_STATUS.OK, null, "نشست با موفقیت حذف شد");
});

/**
 * Get current session status
 * GET /api/auth/session
 */
export const session = asyncHandler(async (req, res) => {
  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    {
      authorized: true,
      session: {
        id: req.userId,
      },
    },
  );
});
