import { HTTP_STATUS, MESSAGES } from "../constants/http.js";

/**
 * 404 handler for routes that do not exist
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export default function notFoundHandler(req, res) {
  return res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: MESSAGES.ROUTE_NOT_FOUND,
  });
}
