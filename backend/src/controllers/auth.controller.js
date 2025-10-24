import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../lib/utils.js";
import { SendWelcomeEmail } from "../emails/emailHandlers.js";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password)
      return res.status(400).json({ message: "ALL FIELDS ARE  REQUIRED" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "PASSWORD SHOULD BE ATLEAST OF 6 CHARACTERS" });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "INVALID EMAIL" });

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "USER ALREADY EXISTS" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ fullname, email, password: hashedPassword });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser,
        fullname: newUser.fullname,
        email: newUser.email,
        profilepic: newUser.profilepic,
      });

      try {
        await SendWelcomeEmail(
          newUser.email,
          newUser.fullname,
          process.env.CLIENT_URL
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(400).json({ message: "INVALID USER DATA" });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credintials" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "INVALID CREDENTIALS" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.log("error in login controller", error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "USER LOGGED OUT" });
};
