import express from "express";
import { registerControl, loginControl } from "../controller/auth.js";
import upload from "../helper/fileUploder.js";
import { verifyToken } from "../middleware/auth.js";
const routes = express.Router();

routes.post("/register", upload.single("file"), verifyToken, registerControl);
routes.post("/login", loginControl);

export default routes;
