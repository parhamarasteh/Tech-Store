import { HTTP_STATUS } from "../constants/http.js";

/**
 * Sends a standardized success response
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {*} data
 * @param {string} [message]
 */
export const sendSuccess = (res, statusCode = HTTP_STATUS.OK, data = null, message = null) => {
  const responsePayload = {
    success: true,
  };

  if (message) {
    responsePayload.message = message;
  }

  if (data !== null && data !== undefined) {
    // If data is an array or primitive or object, we include it
    if (typeof data === "object" && !Array.isArray(data)) {
      Object.assign(responsePayload, data);
    } else {
      responsePayload.data = data;
    }
  }

  return res.status(statusCode).json(responsePayload);
};

/**
 * Sends a standardized error response
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {*} [errors]
 */
export const sendError = (res, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, message = null, errors = null) => {
  const responsePayload = {
    success: false,
    message: message || "خطایی رخ داده است",
  };

  if (errors) {
    responsePayload.errors = errors;
  }

  return res.status(statusCode).json(responsePayload);
};
