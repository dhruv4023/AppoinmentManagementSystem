import WidgetsOnPage from "Components/WidgetsOnPage";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookAppointMentWidget from "Widgets/BookAppointment/BookAppointMentWidget";
import DashBoardWidget from "Widgets/DashBoard/DashBoardWidget";
import QRWidget from "Widgets/QRWidget";
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
  // console.log(admin, UID, user?.username);
  return (
    <WidgetsOnPage
      leftComponent={
        <>
          <UserWidgets user={user} />
          {UID && (
            <QRWidget
              description={"Scan QR To Open Book Appointment Form"}
              link={`/service/${UID}/${SID}`}
            />
          )}
        </>
      }
      rightComponent={
        <>
          {servData && <DisplayServiceWidget servData={servData} />}{" "}
          {UID === admin?.username ? (
            <>{servData && <DashBoardWidget SID={servData.SID} />}</>
          ) : (
            <WidgetWrapper mt={"0.8rem"}>
              <>{servData && <BookAppointMentWidget servData={servData} />}</>
            </WidgetWrapper>
          )}
        </>
      }
    />
  );
};

export default DashBoardAndUserView;
