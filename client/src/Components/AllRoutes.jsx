import HomePage from "Pages/HomePage/HomePage";
import ChangePass from "Pages/LoginPage/ChangePass";
import { LoginPage } from "Pages/LoginPage/LoginPage";
import { ProfilePage } from "Pages/ProfilePage/ProfilePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/:page"} element={<LoginPage />} />
      <Route path={"/profile/:userId"} element={<ProfilePage />} />
    </Routes>
  );
};
