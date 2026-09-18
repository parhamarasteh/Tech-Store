import { verifySession } from "../lib/session.js";
import { HTTP_STATUS, MESSAGES } from "../constants/http.js";

/**
 * Authentication middleware that verifies JWT token from cookies or Authorization Bearer header
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function authMiddleware(req, res, next) {
  try {
    let token = req.cookies?.token;

    // Check Authorization header if cookie is absent
    if (!token && req.headers?.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7).trim();
      }
    }

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        authorized: false,
        message: MESSAGES.UNAUTHORIZED,
      });
    }

    const session = await verifySession(token);

    if (!session.isAuth || !session.userId) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        authorized: false,
        message: MESSAGES.UNAUTHORIZED,
      });
    }

    req.userId = session.userId;
    next();
  } catch (error) {
    next(error);
  }
}
