import Loading from "Components/Loader/Loading";
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
    getServDataDashBordAndBook(UID, SID).then((data) => setServData(data));
    getUser(setUser, UID);
  }, [UID, SID, setServData]);
  // console.log(servData);
  // console.log(admin, UID, user?.username);
  return (
    <WidgetsOnPage
      leftComponent={
        <>
          {user ? <UserWidgets user={user} /> : <Loading />}
          {UID ? (
            <QRWidget
              description={"Scan QR To Open Book Appointment Form"}
              link={`/service/${UID}/${SID}`}
            />
          ) : (
            <Loading />
          )}
        </>
      }
      rightComponent={
        <>
          {servData ? (
            <DisplayServiceWidget servData={servData} />
          ) : (
            <Loading />
          )}{" "}
          {UID === admin?.username ? (
            <>
              {servData ? <DashBoardWidget SID={servData.SID} /> : <Loading />}
            </>
          ) : (
            <WidgetWrapper mt={"0.8rem"}>
              <>
                {servData ? (
                  <BookAppointMentWidget servData={servData} />
                ) : (
                  <Loading />
                )}
              </>
            </WidgetWrapper>
          )}
        </>
      }
    />
  );
};

export default DashBoardAndUserView;
