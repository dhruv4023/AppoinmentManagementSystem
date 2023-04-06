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

routes.post("/post/:sid", saveAppointment);
routes.get("/getbookedtime/:sid", getBookedTime);
routes.get("/getsinglebookeddata/:aid", getSingleBookedData);
routes.post("/getallbookeddata/:sid/:date", getAllBookedData);
routes.post("/changeAppointmentStatus/:aid", changeAppointmentStatus);
routes.get("/cancelAppointment/:aid",cancelAppointment );

routes.post(
  "/checkWhetherAppointmentAlredyBooked/:sid",
  checkWhetherAppointmentAlredyBooked
);

export default routes;
