import express from "express";
const Router = express.Router();

Router.get("/send", (req, res) => {
  res.send("send endpoint");
});
export default Router;
