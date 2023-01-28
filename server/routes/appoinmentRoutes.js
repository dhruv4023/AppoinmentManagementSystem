import express from "express";

import {
  getAdminServices,
  createService,
  getServicesOnBookingPage,
} from "../controller/appointment.js";
import {
  saveAppointment,
  getBookedTime,
  getBookedData,
  getAllBookedData,
} from "../controller/bookAppointment.js";
import { verifyToken } from "../middleware/auth.js";
const routes = express.Router();

routes.post("/post", verifyToken, createService);

routes.get("/get/:username", getAdminServices);
routes.get("/get/:username/:category", getServicesOnBookingPage);

routes.post("/post/:id", saveAppointment);
routes.get("/getbookedtime/:id", getBookedTime);
routes.get("/getbookeddata/:id/:id2", getBookedData);
routes.get("/getallbookeddata/:id", getAllBookedData);

export default routes;
