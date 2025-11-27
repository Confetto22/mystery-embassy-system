import express from "express";
// import { connect } from "./db/db.js";
import { connect } from "./db/db.js";
import cors from "cors";

import dotenv from "dotenv";
import memberRoutes from "./routes/member.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import eventRoutes from "./routes/event.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/members", memberRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/overview", analyticsRoutes);

const PORT = process.env.PORT || 5000;
// console.log(new Date().toLocaleDateString());

async function initializeDatabase() {
  try {
    const isConnected = await connect();
    if (!isConnected) {
      console.error("❌ Database connection failed");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    process.exit(1);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await initializeDatabase();
});
