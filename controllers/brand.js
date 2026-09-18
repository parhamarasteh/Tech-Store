import BrandModel from "../models/brand.js";
import { HTTP_STATUS } from "../constants/http.js";
import { sendSuccess } from "../utils/response.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Get all brands
 * GET /api/brand
 */
export const getBrands = asyncHandler(async (req, res) => {
  const brands = await BrandModel.find().lean();
  return sendSuccess(res, HTTP_STATUS.OK, brands);
});

/**
 * Get single brand by ID
 * GET /api/brand/:id
 */
export const getBrandById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id).lean();

  if (!brand) {
    throw new AppError("برند مورد نظر یافت نشد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(res, HTTP_STATUS.OK, brand);
});

/**
 * Create a new brand
 * POST /api/brand
 */
export const addBrand = asyncHandler(async (req, res) => {
  const brand = await BrandModel.create(req.body);
  return sendSuccess(res, HTTP_STATUS.CREATED, brand, "برند با موفقیت ایجاد شد");
});

/**
 * Update an existing brand
 * PUT /api/brand/:id
 */
export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedBrand = await BrandModel.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  ).lean();

  if (!updatedBrand) {
    throw new AppError("برند وجود ندارد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    { brandId: id, brand: updatedBrand },
    "برند با موفقیت به‌روزرسانی شد",
  );
});

/**
 * Delete a brand
 * DELETE /api/brand/:id
 */
export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedBrand = await BrandModel.findByIdAndDelete(id);

  if (!deletedBrand) {
    throw new AppError("برند وجود ندارد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    { brandId: id },
    "برند با موفقیت حذف شد",
  );
});

// Alias for backward compatibility if needed
export const getBrand = getBrands;
