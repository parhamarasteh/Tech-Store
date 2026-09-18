export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  UNAUTHORIZED: "برای دسترسی به این بخش باید وارد شوید",
  FORBIDDEN: "شما مجاز به انجام این عملیات نیستید",
  NOT_FOUND: "منبع مورد نظر یافت نشد",
  ROUTE_NOT_FOUND: "آدرس درخواست شده وجود ندارد",
  VALIDATION_ERROR: "اطلاعات ارسالی نامعتبر است",
  INTERNAL_ERROR: "خطای داخلی سرور رخ داده است",
  INVALID_ID: "شناسه ارسال شده معتبر نمی‌باشد",
};
