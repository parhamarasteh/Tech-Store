import dotenv from "dotenv";

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "4000", 10),
  MONGO_URI: process.env.MONGO_URI_STRING || "mongodb://localhost:27017/shop",
  SESSION_SECRET: process.env.SESSION_SECRET || "default_session_secret_change_in_production_32chars",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  TOKEN_EXPIRY_HOURS: 2,
};

if (!process.env.SESSION_SECRET && env.NODE_ENV === "production") {
  console.warn("WARNING: SESSION_SECRET is not set in environment variables!");
}

export default env;
