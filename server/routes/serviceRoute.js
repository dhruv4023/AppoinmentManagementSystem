import express from "express";

import {
  getAdminServices,
  createService,
  getServicesOnBookingPage,
  getFilteredData,
} from "../controller/services.js";

import { verifyToken } from "../middleware/auth.js";
const routes = express.Router();

routes.post("/postss", createService);

routes.get("/get/:username", getAdminServices);
routes.get("/getServDtOnBookPage/:sid", getServicesOnBookingPage);

routes.post("/getfiltereddata", getFilteredData);

export default routes;
