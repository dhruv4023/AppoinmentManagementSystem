import express from "express";

import {
  getDayData,
  getMonthData,
  getYearData,
} from "../controller/chartData.js";

const routes = express.Router();

routes.post("/monthlyData", getMonthData);
routes.post("/daysData", getDayData);
routes.post("/yealyData", getYearData);

export default routes;
