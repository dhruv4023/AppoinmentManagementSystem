import express from "express";

import {
  getUsers,
  getUserFriend,
  addRemoveFriend,
} from "../controller/user.js";
import { verifyToken } from "../middleware/auth.js";
const routes = express.Router();

routes.get("/get/:id", verifyToken, getUsers);
routes.get("/get/:id/friend", verifyToken, getUserFriend);
routes.patch("/addRmFrd/:id/:frdId", verifyToken, addRemoveFriend);

export default routes;
