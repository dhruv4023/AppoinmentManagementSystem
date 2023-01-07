import express from "express";

import {
  getFeedPost,
  getUserPosts,
  likePost,
  createPostControl,
} from "../controller/post.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../helper/fileUploder.js";

const routes = express.Router();

routes.post("/posts", upload.single("file"), verifyToken, createPostControl);

routes.get("/get/", verifyToken, getFeedPost);
routes.get("/get/:UserId/posts", verifyToken, getUserPosts);
routes.patch("/:id/like", verifyToken, likePost);

export default routes;
