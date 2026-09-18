import { isValidObjectId } from "mongoose";
import { HTTP_STATUS, MESSAGES } from "../constants/http.js";

/**
 * Middleware factory to validate that a request parameter is a valid MongoDB ObjectId
 * @param {string} [paramName='id'] - The route parameter name to validate
 * @returns {import('express').RequestHandler}
 */
export const validateObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!id || !isValidObjectId(id)) {
      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: MESSAGES.INVALID_ID,
      });
    }

    next();
  };
};

export default validateObjectId;
