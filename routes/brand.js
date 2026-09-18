import { Router } from "express";
import {
  getBrands,
  getBrandById,
  addBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.js";
import authMiddleware from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import validateObjectId from "../middlewares/validateId.js";
import { addBrandSchema, updateBrandSchema } from "../validation/brand.js";

const router = Router();

/**
 * @route   GET /api/brand
 * @desc    Get list of all brands
 * @access  Public
 */
router.get("/", getBrands);

/**
 * @route   GET /api/brand/:id
 * @desc    Get a single brand by ID
 * @access  Public
 */
router.get("/:id", validateObjectId("id"), getBrandById);

/**
 * @route   POST /api/brand
 * @desc    Create a new brand
 * @access  Private
 */
router.post("/", authMiddleware, validate(addBrandSchema), addBrand);

/**
 * @route   PUT /api/brand/:id
 * @desc    Update an existing brand
 * @access  Private
 */
router.put(
  "/:id",
  authMiddleware,
  validateObjectId("id"),
  validate(updateBrandSchema),
  updateBrand,
);

/**
 * @route   DELETE /api/brand/:id
 * @desc    Delete a brand
 * @access  Private
 */
router.delete("/:id", authMiddleware, validateObjectId("id"), deleteBrand);

export default router;
