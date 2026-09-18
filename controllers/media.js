import MediaModel from "../models/media.js";
import { HTTP_STATUS } from "../constants/http.js";
import { sendSuccess } from "../utils/response.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Get all media items
 * GET /api/media
 */
export const getMediaList = asyncHandler(async (req, res) => {
  const media = await MediaModel.find().lean();
  return sendSuccess(res, HTTP_STATUS.OK, media);
});

/**
 * Get single media by ID
 * GET /api/media/:id
 */
export const getMediaById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const media = await MediaModel.findById(id).lean();

  if (!media) {
    throw new AppError("رسانه مورد نظر یافت نشد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(res, HTTP_STATUS.OK, media);
});

/**
 * Create a new media item
 * POST /api/media
 */
export const addMedia = asyncHandler(async (req, res) => {
  const media = await MediaModel.create(req.body);
  return sendSuccess(res, HTTP_STATUS.CREATED, media, "رسانه با موفقیت ایجاد شد");
});

/**
 * Delete a media item
 * DELETE /api/media/:id
 */
export const deleteMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedMedia = await MediaModel.findByIdAndDelete(id);

  if (!deletedMedia) {
    throw new AppError("رسانه وجود ندارد", HTTP_STATUS.NOT_FOUND);
  }

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    { mediaId: id },
    "رسانه با موفقیت حذف شد",
  );
});

// Alias for backward compatibility
export const getMedia = getMediaList;
