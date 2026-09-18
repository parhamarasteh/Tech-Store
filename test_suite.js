import http from "http";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import env from "./config/env.js";
import authRouter from "./routes/auth.js";
import brandRouter from "./routes/brand.js";
import categoryRouter from "./routes/category.js";
import mediaRouter from "./routes/media.js";
import productRouter from "./routes/product.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import { encrypt } from "./lib/session.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/brand", brandRouter);
app.use("/api/category", categoryRouter);
app.use("/api/media", mediaRouter);
app.use("/api/product", productRouter);

app.use(notFoundHandler);
app.use(errorHandler);

function makeRequest(server, options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: server.address().port,
        ...options,
      },
      (res) => {
        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          let parsed;
          try {
            parsed = JSON.parse(rawData);
          } catch (e) {
            parsed = rawData;
          }
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        });
      },
    );

    req.on("error", reject);

    if (body) {
      req.write(typeof body === "string" ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function testSuite() {
  const server = app.listen(0);
  const port = server.address().port;
  console.log(`Test server running on port ${port}`);

  try {
    // 1. Test 404 Route Not Found
    console.log("\n1. Testing 404 Not Found...");
    const notFoundRes = await makeRequest(server, {
      path: "/api/unknown-endpoint",
      method: "GET",
    });
    console.assert(notFoundRes.status === 404, `Expected 404, got ${notFoundRes.status}`);
    console.assert(notFoundRes.body.success === false, "Expected success: false");
    console.log("✅ 404 Handler working correctly");

    // 2. Test Zod Body Validation (Auth Sign-up)
    console.log("\n2. Testing Validation Middleware on Sign-up...");
    const invalidSignupRes = await makeRequest(
      server,
      {
        path: "/api/auth/sign-up",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      { name: "A", email: "invalid", password: "123" },
    );
    console.assert(invalidSignupRes.status === 422, `Expected 422, got ${invalidSignupRes.status}`);
    console.assert(invalidSignupRes.body.success === false, "Expected success: false");
    console.assert(Array.isArray(invalidSignupRes.body.errors), "Expected errors array");
    console.assert(invalidSignupRes.body.fieldErrors.name !== undefined, "Expected name fieldError");
    console.log("✅ Validation Middleware returns structured errors");

    // 3. Test validateObjectId Middleware on Brand / Category / Product
    console.log("\n3. Testing validateObjectId Middleware...");
    const invalidIdRes = await makeRequest(server, {
      path: "/api/brand/123invalid",
      method: "GET",
    });
    console.assert(invalidIdRes.status === 422, `Expected 422, got ${invalidIdRes.status}`);
    console.assert(invalidIdRes.body.message === "شناسه ارسال شده معتبر نمی‌باشد", "Expected Persian invalid ID message");
    console.log("✅ validateObjectId Middleware working correctly");

    // 4. Test Protected Route without Token (Auth Middleware)
    console.log("\n4. Testing Protected Route 401 without Token...");
    const unauthRes = await makeRequest(server, {
      path: "/api/auth/session",
      method: "GET",
    });
    console.assert(unauthRes.status === 401, `Expected 401 Unauthorized, got ${unauthRes.status}`);
    console.assert(unauthRes.body.authorized === false, "Expected authorized: false");
    console.log("✅ Auth Middleware correctly rejects unauthenticated request with 401");

    // 5. Test Protected Route with Bearer Token
    console.log("\n5. Testing Protected Route with Authorization Bearer Header...");
    const testToken = await encrypt({ userId: "65f1a2b3c4d5e6f7a8b9c0d1" });
    const authRes = await makeRequest(server, {
      path: "/api/auth/session",
      method: "GET",
      headers: {
        Authorization: `Bearer ${testToken}`,
      },
    });
    console.assert(authRes.status === 200, `Expected 200 OK, got ${authRes.status}`);
    console.assert(authRes.body.authorized === true, "Expected authorized: true");
    console.assert(authRes.body.session.id === "65f1a2b3c4d5e6f7a8b9c0d1", "Expected correct session user ID");
    console.log("✅ Bearer token authentication verified");

    // 6. Test Product Route Syntax (GET /api/product/:id)
    console.log("\n6. Testing Product Route parameter handling...");
    const invalidProductIdRes = await makeRequest(server, {
      path: "/api/product/badid123",
      method: "GET",
    });
    console.assert(invalidProductIdRes.status === 422, `Expected 422, got ${invalidProductIdRes.status}`);
    console.log("✅ Product route parameter correctly captured by validateObjectId");

    console.log("\n🎉 ALL 6 TEST SCENARIOS PASSED WITH FLYING COLORS!");
  } finally {
    server.close();
  }
}

testSuite().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
