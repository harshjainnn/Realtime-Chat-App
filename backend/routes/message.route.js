import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSidebar,
  messageLoader,
  sendMessage,
} from "../controllers/message.controller.js";

const Router = express.Router();

Router.get("/users", protectRoute, getUsersForSidebar);

Router.get("/:id", protectRoute, messageLoader);

Router.post("/send/:id", protectRoute, sendMessage);
export default Router;
