import express from "express";

import {
  saveAppointment,
  getBookedTime,
  getSingleBookedData,
  getAllBookedData,
  checkWhetherAppointmentAlredyBooked,
  changeAppointmentStatus,cancelAppointment
} from "../controller/appointment.js";

const routes = express.Router();

routes.post("/post/:SID", saveAppointment);
routes.get("/getbookedtime/:SID", getBookedTime);
routes.get("/getsinglebookeddata/:AID", getSingleBookedData);
routes.post("/getallbookeddata/:SID/:date", getAllBookedData);
routes.post("/changeAppointmentStatus/:AID", changeAppointmentStatus);
routes.get("/cancelAppointment/:AID",cancelAppointment );

routes.post(
  "/checkWhetherAppointmentAlredyBooked/:SID",
  checkWhetherAppointmentAlredyBooked
);

export default routes;
