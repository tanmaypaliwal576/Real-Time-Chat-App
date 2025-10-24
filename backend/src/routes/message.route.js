import express from "express";
import { getAllContacts } from "../controllers/message.controller.js";
import { getMessagesByUserId } from "../controllers/message.controller.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";
import { getChatPartners } from "../controllers/message.controller.js";
import { sendMessage } from "../controllers/message.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const Router = express.Router();

Router.use(arcjetProtection, ProtectRoute);

Router.get("/contacts", getAllContacts);
Router.get("/chats", getChatPartners);
Router.get("/:id", getMessagesByUserId);
Router.post("/send/:id", sendMessage);

export default Router;
