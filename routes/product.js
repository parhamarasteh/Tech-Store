import { Router } from "express";
import {
  getProducts,
  getProductById,
  getProductBySale,
  getProductByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";
import authMiddleware from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import validateObjectId from "../middlewares/validateId.js";
import {
  addProductSchema,
  updateProductSchema,
} from "../validation/product.js";

const router = Router();

/**
 * @route   GET /api/product/sale
 * @desc    Get products currently on sale
 * @access  Public
 */
router.get("/sale", getProductBySale);

/**
 * @route   GET /api/product/category/:categoryName
 * @desc    Get products by category english name
 * @access  Public
 */
router.get("/category/:categoryName", getProductByCategory);

/**
 * @route   GET /api/product
 * @desc    Get all products
 * @access  Public
 */
router.get("/", getProducts);

/**
 * @route   GET /api/product/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get("/:id", validateObjectId("id"), getProductById);

/**
 * @route   POST /api/product
 * @desc    Create a new product
 * @access  Private
 */
router.post("/", authMiddleware, validate(addProductSchema), addProduct);

/**
 * @route   PUT /api/product/:id
 * @desc    Update an existing product
 * @access  Private
 */
router.put(
  "/:id",
  authMiddleware,
  validateObjectId("id"),
  validate(updateProductSchema),
  updateProduct,
);

/**
 * @route   DELETE /api/product/:id
 * @desc    Delete a product
 * @access  Private
 */
router.delete("/:id", authMiddleware, validateObjectId("id"), deleteProduct);

export default router;
