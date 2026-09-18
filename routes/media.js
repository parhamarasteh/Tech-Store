import { Router } from "express";
import {
  getMediaList,
  getMediaById,
  addMedia,
  deleteMedia,
} from "../controllers/media.js";
import authMiddleware from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import validateObjectId from "../middlewares/validateId.js";
import { addMediaSchema } from "../validation/media.js";

const router = Router();

/**
 * @route   GET /api/media
 * @desc    Get list of all media
 * @access  Public
 */
router.get("/", getMediaList);

/**
 * @route   GET /api/media/:id
 * @desc    Get single media by ID
 * @access  Public
 */
router.get("/:id", validateObjectId("id"), getMediaById);

/**
 * @route   POST /api/media
 * @desc    Create new media
 * @access  Private
 */
router.post("/", authMiddleware, validate(addMediaSchema), addMedia);

/**
 * @route   DELETE /api/media/:id
 * @desc    Delete a media item
 * @access  Private
 */
router.delete("/:id", authMiddleware, validateObjectId("id"), deleteMedia);

export default router;
