import express from "express";

import {
  getAdminServices,
  createService,
  getServicesOnBookingPage,
  getFilteredData,
} from "../controller/appointment.js";

import {
  saveAppointment,
  getBookedTime,
  getSingleBookedData,
  getAllBookedData,
  checkWhetherAppointmentAlredyBooked,
} from "../controller/bookAppointment.js";
import { verifyToken } from "../middleware/auth.js";
const routes = express.Router();

routes.post("/post", verifyToken, createService);

routes.get("/get/:username", getAdminServices);
routes.get("/get/:username/:category", getServicesOnBookingPage);

routes.post("/post/:id", saveAppointment);
routes.get("/getbookedtime/:id", getBookedTime);
routes.get("/getbookeddata/:AID/:UAID", getSingleBookedData);
routes.get("/getallbookeddata/:id", getAllBookedData);

routes.post("/getfiltereddata", getFilteredData);
routes.post("/checkWhetherAppointmentAlredyBooked/:id", checkWhetherAppointmentAlredyBooked);

export default routes;
