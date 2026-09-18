import { Router } from "express";
import { session, signIn, signOut, signUp } from "../controllers/auth.js";
import authMiddleware from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { signInSchema, signUpSchema } from "../validation/auth.js";

const router = Router();

/**
 * @route   POST /api/auth/sign-up
 * @desc    Register a new user account
 * @access  Public
 */
router.post("/sign-up", validate(signUpSchema), signUp);

/**
 * @route   POST /api/auth/sign-in
 * @desc    Authenticate user and create session
 * @access  Public
 */
router.post("/sign-in", validate(signInSchema), signIn);

/**
 * @route   DELETE /api/auth/sign-out
 * @desc    Clear active user session
 * @access  Private
 */
router.delete("/sign-out", authMiddleware, signOut);

/**
 * @route   GET /api/auth/session
 * @desc    Verify current session validity
 * @access  Private
 */
router.get("/session", authMiddleware, session);

export default router;
