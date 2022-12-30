import express from "express";
import { registerControl, loginControl } from "../controller/auth.js";
import upload from "../helper/fileUploder.js";
const routes = express.Router();

routes.post("/register", upload.single("picPath"), registerControl);
routes.post("/login", loginControl);

export default routes;
