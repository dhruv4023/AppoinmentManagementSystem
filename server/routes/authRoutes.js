import express from "express";
import { registerControl, loginControl,changePassControl } from "../controller/auth.js";
import upload from "../helper/fileUploder.js";
const routes = express.Router();

routes.post("/register", upload.single("picPath"), registerControl);
routes.post("/login", loginControl);
routes.post("/changepass", changePassControl);

export default routes;
