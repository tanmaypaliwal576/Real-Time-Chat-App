import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";

const Router = express.Router();

Router.post("/signup", signup);

Router.post("/login", login);

Router.post("/logout", logout);

Router.put("/update-profile", ProtectRoute, updateProfile);

Router.get("/check", ProtectRoute, (req, res) => {
  res.status(200).json(req.user);
}); //when we refresh authorized user should see same page otherwise it should see signup page

export default Router;

//server -> routes -> controllers
