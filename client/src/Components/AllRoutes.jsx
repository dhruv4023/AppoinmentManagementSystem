import HomePage from "Pages/HomePage/HomePage";
import { LoginPage } from "Pages/LoginPage/LoginPage";
import { ProfilePage } from "Pages/ProfilePage/ProfilePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/home"} element={<HomePage />} />
      <Route path={"/"} element={<LoginPage />} />
      <Route path={"/ProfilePage/:userId"} element={<ProfilePage />} />
    </Routes>
  );
};
