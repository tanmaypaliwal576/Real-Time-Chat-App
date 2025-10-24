//IMPORTING
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectdb } from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const __dirname = path.resolve();

const PORT = 3000; // ✅ Backend stays on port 3000

// ✅ CORS FIRST
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ JSON Body Parser
app.use(express.json());
app.use(cookieParser());
// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Production serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
  connectdb();
});
