import CategoryModel from "../models/category.js";
import { HTTP_STATUS } from "../constants/http.js";
import { sendSuccess } from "../utils/response.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Get all categories
 * GET /api/category
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryModel.find().lean();
  return sendSuccess(res, HTTP_STATUS.OK, categories);
});

/**
 * Get single category by ID
 * GET /api/category/:id
 */
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id).lean();

  if (!category) {
    throw new AppError("دسته‌بندی مورد نظر یافت نشد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(res, HTTP_STATUS.OK, category);
});

/**
 * Create a new category
 * POST /api/category
 */
export const addCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.create(req.body);
  return sendSuccess(res, HTTP_STATUS.CREATED, category, "دسته‌بندی با موفقیت ایجاد شد");
});

/**
 * Update an existing category
 * PUT /api/category/:id
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  ).lean();

  if (!updatedCategory) {
    throw new AppError("دسته‌بندی وجود ندارد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    { categoryId: id, category: updatedCategory },
    "دسته‌بندی با موفقیت به‌روزرسانی شد",
  );
});

/**
 * Delete a category
 * DELETE /api/category/:id
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedCategory = await CategoryModel.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new AppError("دسته‌بندی وجود ندارد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    { categoryId: id },
    "دسته‌بندی با موفقیت حذف شد",
  );
});

// Alias for backward compatibility
export const getCategory = getCategories;
