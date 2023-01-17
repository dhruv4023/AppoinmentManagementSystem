import express from "express";
import {
  registerControl,
  loginControl,
  changePassControl,
  getUserNames,
} from "../controller/auth.js";
import upload from "../helper/fileUploder.js";
const routes = express.Router();

routes.post("/register", upload.single("picPath"), registerControl);
routes.post("/login", loginControl);
routes.post("/changepass", changePassControl);
routes.get("/usernames", getUserNames);

export default routes;
