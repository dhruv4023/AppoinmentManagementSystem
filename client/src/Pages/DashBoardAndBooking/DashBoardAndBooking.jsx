import WidgetsOnPage from "Components/WidgetsOnPage";
import WidgetWrapper from "Components/WidgetWrapper";
import { Navbar } from "Pages/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookAppointMentWidget from "Widgets/BookAppointment/BookAppointMentWidget";
import DashBoardWidget from "Widgets/DashBoard/DashBoardWidget";
import DisplayServiceWidget from "Widgets/Service/Admin/DisplayService/DisplayServiceWidget";
import UserWidgets from "Widgets/UserWidgets";
import { getUser } from "Widgets/WidgetFunctions";
import { getServDataDashBordAndBook } from "./getPostData";

const DashBoardAndUserView = () => {
  const admin = useSelector((state) => state.user);
  const { UID, SID } = useParams();
  const [user, setUser] = useState(null);
  const [servData, setServData] = useState();
  useEffect(() => {
    getServDataDashBordAndBook(UID, SID, setServData);
    getUser(setUser, UID);
  }, [UID, SID, setServData]);
  // console.log("servData");
  return (
    <WidgetsOnPage
      navbar={<Navbar />}
      leftComponent={<UserWidgets user={user} />}
      rightComponent={
        <>
          {servData && <DisplayServiceWidget servData={servData} />}
          <WidgetWrapper mt={"0.8rem"}>
            {" "}
            {admin ? (
              <>
                <DashBoardWidget />
              </>
            ) : (
              <>
                <BookAppointMentWidget servData={servData} />
              </>
            )}
          </WidgetWrapper>
        </>
      }
    />
  );
};

export default DashBoardAndUserView;
