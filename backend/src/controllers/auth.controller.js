import generateToken from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";

// =======================================
// SIGNUP CONTROLLER
// =======================================
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // Persist user first, then issue auth cookie
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res); // ✅ EMAIL NOTIFICATION LOGIC

      try {
        // Pass user's email inside an array, and the user's name
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullname,
          ENV.CLIENT_URL
        );
      } catch (error) {
        // Email failure should not block successful registration
        console.error("Failed to send signup notification email:", error);
      }

      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// =======================================
// LOGIN CONTROLLER
// =======================================
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// =======================================
// LOGOUT CONTROLLER
// =======================================
export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  return res.status(200).json({ message: "Logged out successfully" });
};

// =======================================
// UPDATE PROFILE CONTROLLER
// =======================================
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Profile pic is required" }); // Ensure a protection middleware has set req.user

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Ensure profilePic casing matches your Mongoose Schema
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    console.log(updatedUser);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
