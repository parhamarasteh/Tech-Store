/**
 * Formats Zod validation error issues into a clean, structured array and map
 * @param {import('zod').ZodError} zodError
 * @returns {{ errors: string[], fieldErrors: Record<string, string[]> }}
 */
export default function flattenZodError(zodError) {
  if (!zodError || !zodError.issues) {
    return { errors: ["اطلاعات ارسالی نامعتبر است"], fieldErrors: {} };
  }

  const errors = [];
  const fieldErrors = {};

  for (const issue of zodError.issues) {
    const field = issue.path.join(".") || "general";
    const message = issue.message;

    errors.push(message);

    if (!fieldErrors[field]) {
      fieldErrors[field] = [];
    }
    fieldErrors[field].push(message);
  }

  return { errors, fieldErrors };
}
