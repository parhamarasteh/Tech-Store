import mongoose from "mongoose";
import env from "../config/env.js";

async function purge() {
  try {
    console.log(`Connecting to MongoDB at: ${env.MONGO_URI}`);
    await mongoose.connect(env.MONGO_URI);
    await mongoose.connection.dropDatabase();

    console.log("✅ Database dropped successfully");
  } catch (error) {
    console.error("❌ Error dropping database:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

purge();
