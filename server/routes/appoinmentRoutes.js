import express from "express";

import {
  getAdminServices,
  // getUserPosts,
  // likePost,
  // createPostControl,
  createService
} from "../controller/appointment.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../helper/fileUploder.js";

const routes = express.Router();

routes.post("/post", verifyToken, createService);

routes.get("/get/:username", getAdminServices);
// routes.get("/get/:UserId/posts", verifyToken, getUserPosts);
// routes.patch("/:id/like", verifyToken, likePost);

export default routes;
