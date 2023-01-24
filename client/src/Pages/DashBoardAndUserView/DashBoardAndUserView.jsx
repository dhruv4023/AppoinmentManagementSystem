import { Box, useMediaQuery } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import WidgetsOnPage from "Components/WidgetsOnPage";
import { Navbar } from "Pages/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookAppointMentWidget from "Widgets/BookAppointment/BookAppointMentWidget";
import DashBoardWidget from "Widgets/DashBoard/DashBoardWidget";
import UserWidgets from "Widgets/UserWidgets";
import { getUser } from "Widgets/WidgetFunctions";

const DashBoardAndUserView = () => {
  const admin = useSelector((state) => state.user);
  const { UID, SID } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser(setUser, UID);
  }, [UID]);
  return (
    <WidgetsOnPage
      navbar={<Navbar />}
      leftComponent={<UserWidgets user={user} />}
      rightComponent={
        admin ? (
          <>
            <DashBoardWidget />
          </>
        ) : (
          <>
            <BookAppointMentWidget />
          </>
        )
      }
    />
  );
};

export default DashBoardAndUserView;
