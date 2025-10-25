import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const ProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorised No Token Provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // If jwt.verify succeeds, decoded is the payload. jwt.verify throws if the token is invalid.

    // The check 'if (!decoded)' is technically redundant if jwt.verify succeeds, but harmless.
    if (!decoded) return res.status(401).json({ message: "Invalid Token" });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next(); // SUCCESS: Continue to the protected route handler
  } catch (error) {
    console.log("Error in ProtectRoute middleware:", error.message);
    // 1. Handle specific JWT errors (TokenExpiredError, JsonWebTokenError) with a 401 response.
    // This is the most common reason for the catch block to run immediately.
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid or expired token" });
    }

    // 2. For all other UNEXPECTED errors (like database connection issues),
    // we use next(error) to send the error to Express's central error handler.
    // This prevents the headers-sent conflict.
    next(error);
  }
};
