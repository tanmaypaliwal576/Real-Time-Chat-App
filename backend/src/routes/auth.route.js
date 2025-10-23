import express from "express";
import { signup } from "../controllers/auth.controller.js";
const Router = express.Router();

Router.get("/signup", signup);

Router.get("/login", (req, res) => {
  res.send("login endpoint");
});

Router.get("/logout", (req, res) => {
  res.send("logout endpoint");
});

export default Router;

//server -> routes -> controllers
