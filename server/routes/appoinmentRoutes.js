import express from "express";

import {
  saveAppointment,
  getBookedTime,
  getSingleBookedData,
  getAllBookedData,
  checkWhetherAppointmentAlredyBooked,
} from "../controller/bookAppointment.js";

const routes = express.Router();

routes.post("/post/:SID", saveAppointment);
routes.get("/getbookedtime/:SID", getBookedTime);
routes.get("/getsinglebookeddata/:AID", getSingleBookedData);
routes.get("/getallbookeddata/:id", getAllBookedData);

routes.post(
  "/checkWhetherAppointmentAlredyBooked/:SID",
  checkWhetherAppointmentAlredyBooked
);

export default routes;
