import AboutUs from "Pages/AboutUs/AboutUs";
import ContactUsPage from "Pages/ContactUs/ContactUsPage";
import HomePage from "Pages/HomePage/HomePage";
import { LoginPage } from "Pages/LoginPage/LoginPage";
import { ProfilePage } from "Pages/ProfilePage/ProfilePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/about"} element={<AboutUs />} />
      <Route path={"/contact"} element={<ContactUsPage />} />
      <Route path={"/:page"} element={<LoginPage />} />
      <Route path={"/profile/:userId"} element={<ProfilePage />}
       />
    </Routes>
  );
};
