import { SignJWT, jwtVerify } from "jose";
import env from "../config/env.js";

const encodedSecretKey = new TextEncoder().encode(env.SESSION_SECRET);
const EXPIRATION_TIME = `${env.TOKEN_EXPIRY_HOURS}h`;

/**
 * Encrypts a payload into a signed JWT token
 * @param {object} payload
 * @returns {Promise<string>}
 */
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRATION_TIME)
    .sign(encodedSecretKey);
}

/**
 * Decrypts and verifies a JWT token
 * @param {string} token
 * @returns {Promise<object | null>}
 */
export async function decrypt(token) {
  try {
    if (!token || typeof token !== "string") {
      return null;
    }

    const { payload } = await jwtVerify(token, encodedSecretKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Creates a new session with an expiration timestamp and encrypted token
 * @param {string} userId
 * @returns {Promise<{ expiresAt: Date, session: string }>}
 */
export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + env.TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt: expiresAt.toISOString() });

  return { expiresAt, session };
}

/**
 * Verifies if a given token represents a valid active session
 * @param {string} token
 * @returns {Promise<{ isAuth: boolean, userId?: string }>}
 */
export async function verifySession(token) {
  const payload = await decrypt(token);

  if (!payload || !payload.userId) {
    return { isAuth: false };
  }

  return { isAuth: true, userId: payload.userId };
}
