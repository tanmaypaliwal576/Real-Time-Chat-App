//IMPORTING
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectdb } from "./lib/db.js";

const app = express();
dotenv.config();
const __dirname = path.resolve();

const PORT = process.env.PORT;
app.use(express.json()); // req.body
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.send(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(3000, () => {
  console.log(`Server is Running on ${PORT}`);
  connectdb();
});
