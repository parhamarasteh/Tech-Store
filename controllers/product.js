import ProductModel from "../models/product.js";
import CategoryModel from "../models/category.js";
import BrandModel from "../models/brand.js";
import MediaModel from "../models/media.js";
import { HTTP_STATUS } from "../constants/http.js";
import { sendSuccess } from "../utils/response.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";

const POPULATE_FIELDS = [
  { path: "media", select: "url" },
  { path: "category", select: "name en_name image" },
  { path: "brand", select: "name logo" },
];

/**
 * Validate that referenced foreign documents exist in database
 */
async function validateForeignKeys({ category, brand, media }) {
  if (category) {
    const categoryExists = await CategoryModel.exists({ _id: category });
    if (!categoryExists) {
      throw new AppError("دسته‌بندی ارجاع داده شده وجود ندارد", HTTP_STATUS.UNPROCESSABLE_ENTITY);
    }
  }

  if (brand) {
    const brandExists = await BrandModel.exists({ _id: brand });
    if (!brandExists) {
      throw new AppError("برند ارجاع داده شده وجود ندارد", HTTP_STATUS.UNPROCESSABLE_ENTITY);
    }
  }

  if (media && Array.isArray(media) && media.length > 0) {
    const mediaCount = await MediaModel.countDocuments({ _id: { $in: media } });
    if (mediaCount !== media.length) {
      throw new AppError("یک یا چند رسانه ارجاع داده شده وجود ندارد", HTTP_STATUS.UNPROCESSABLE_ENTITY);
    }
  }
}

/**
 * Get all products
 * GET /api/product
 */
export const getProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find()
    .populate(POPULATE_FIELDS)
    .lean();

  return sendSuccess(res, HTTP_STATUS.OK, products);
});

/**
 * Get single product by ID
 * GET /api/product/:id
 */
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id)
    .populate(POPULATE_FIELDS)
    .lean();

  if (!product) {
    throw new AppError("محصول یافت نشد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(res, HTTP_STATUS.OK, product);
});

/**
 * Get products on sale
 * GET /api/product/sale
 */
export const getProductBySale = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({ sale: { $gt: 0 } })
    .populate(POPULATE_FIELDS)
    .lean();

  return sendSuccess(res, HTTP_STATUS.OK, products);
});

/**
 * Get products by category english name
 * GET /api/product/category/:categoryName
 */
export const getProductByCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.params;

  const category = await CategoryModel.findOne({
    en_name: categoryName.toLowerCase().trim(),
  })
    .populate({
      path: "products",
      populate: [
        { path: "media", select: "url" },
        { path: "brand", select: "name logo" },
      ],
    })
    .lean({ virtuals: true });

  if (!category) {
    throw new AppError("دسته‌بندی مورد نظر یافت نشد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(res, HTTP_STATUS.OK, category);
});

/**
 * Create a new product
 * POST /api/product
 */
export const addProduct = asyncHandler(async (req, res) => {
  await validateForeignKeys(req.body);

  const product = await ProductModel.create(req.body);

  return sendSuccess(
    res,
    HTTP_STATUS.CREATED,
    { _id: product._id, name: product.name },
    "محصول با موفقیت ایجاد شد",
  );
});

/**
 * Update an existing product
 * PUT /api/product/:id
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await validateForeignKeys(req.body);

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  ).lean();

  if (!updatedProduct) {
    throw new AppError("محصول وجود ندارد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    { productId: id, product: updatedProduct },
    "محصول با موفقیت به‌روزرسانی شد",
  );
});

/**
 * Delete a product
 * DELETE /api/product/:id
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await ProductModel.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new AppError("محصول وجود ندارد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    { productId: id },
    "محصول با موفقیت حذف شد",
  );
});

// Backward compatibility helper
export const getProduct = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    return getProductById(req, res, next);
  }
  return getProducts(req, res, next);
});
