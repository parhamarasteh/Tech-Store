/**
 * Wraps an async route handler or middleware to catch any errors and forward them to Express next()
 * @param {Function} fn - Async express route handler or middleware
 * @returns {Function} Express middleware function
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
