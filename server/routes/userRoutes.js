import express from "express";

import {
  getUsers,
} from "../controller/user.js";
import { verifyToken } from "../middleware/auth.js";
const routes = express.Router();

routes.get("/get/:id", verifyToken, getUsers);

export default routes;
