import mongoose from "mongoose";
import env from "../config/env.js";

/**
 * Initializes connection to MongoDB
 * @returns {Promise<typeof mongoose>}
 */
export default async function initialMongoose() {
  try {
    const connection = await mongoose.connect(env.MONGO_URI);
    console.log("✅ Successfully connected to MongoDB database");
    return connection;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    throw error;
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB connection disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

/**
 * Closes the MongoDB database connection gracefully
 */
export async function closeDB() {
  await mongoose.connection.close();
  console.log("MongoDB connection closed cleanly");
}