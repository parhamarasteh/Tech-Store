import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";
import authMiddleware from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import validateObjectId from "../middlewares/validateId.js";
import {
  addCategorySchema,
  updateCategorySchema,
} from "../validation/category.js";

const router = Router();

/**
 * @route   GET /api/category
 * @desc    Get list of all categories
 * @access  Public
 */
router.get("/", getCategories);

/**
 * @route   GET /api/category/:id
 * @desc    Get a single category by ID
 * @access  Public
 */
router.get("/:id", validateObjectId("id"), getCategoryById);

/**
 * @route   POST /api/category
 * @desc    Create a new category
 * @access  Private
 */
router.post("/", authMiddleware, validate(addCategorySchema), addCategory);

/**
 * @route   PUT /api/category/:id
 * @desc    Update an existing category
 * @access  Private
 */
router.put(
  "/:id",
  authMiddleware,
  validateObjectId("id"),
  validate(updateCategorySchema),
  updateCategory,
);

/**
 * @route   DELETE /api/category/:id
 * @desc    Delete a category
 * @access  Private
 */
router.delete("/:id", authMiddleware, validateObjectId("id"), deleteCategory);

export default router;
