import AboutUs from "Pages/AboutUs/AboutUs";
import ContactUsPage from "Pages/ContactUs/ContactUsPage";
import DashBoardAndUserView from "Pages/DashBoardAndBooking/DashBoardAndBooking";
import Help from "Pages/Help/Help";
import HomePage from "Pages/HomePage/HomePage";
import { LoginPage } from "Pages/LoginPage/LoginPage";
import PageNotFound from "Pages/PageNotFound";
import PrintAndVerifyAppointment from "Pages/PrintCalcelAndVerifyAppointment/PrintAndVerifyAppointment";
import PrintPreview from "Pages/PrintCalcelAndVerifyAppointment/Widget/PrintPreview";
import { ProfilePage } from "Pages/ProfilePage/ProfilePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/:page"} element={<LoginPage />} />
      <Route path={"/help"} element={<Help />} />
      <Route path={"/about"} element={<AboutUs />} />
      <Route path={"/contact"} element={<ContactUsPage />} />
      <Route path={"/profile/:UID"} element={<ProfilePage />} />
      <Route path={"/preview"} element={<PrintPreview />} />
      <Route path={"/printreceipt"} element={<PrintAndVerifyAppointment />} />
      <Route
        path={"/printreceipt/:aid"}
        element={<PrintAndVerifyAppointment />}
      />
      <Route path={"/service/:UID/:sid"} element={<DashBoardAndUserView />} />
      <Route path={"/404"} element={<PageNotFound />} />
    </Routes>
  );
};
