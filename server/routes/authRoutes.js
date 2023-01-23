import express from "express";
import {
  registerControl,
  loginControl,
  changePassControl,
  getUserNames,
  updateRegisteredData,
} from "../controller/auth.js";
import upload from "../helper/fileUploder.js";
import { verifyToken } from "../middleware/auth.js";
const routes = express.Router();

routes.post("/register", upload.single("picPath"), registerControl);
routes.post(
  "/update/:id",
  verifyToken,
  upload.single("picPath"),
  updateRegisteredData
);
routes.post("/login", loginControl);
routes.post("/changepass", changePassControl);
routes.get("/usernames", getUserNames);

export default routes;
