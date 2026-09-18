import env from "../config/env.js";

export const getAuthCookieOptions = (expiresAt) => {
  const isProduction = env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    path: "/",
    ...(expiresAt && { expires: expiresAt }),
  };
};

export const getClearCookieOptions = () => {
  const isProduction = env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    path: "/",
  };
};
