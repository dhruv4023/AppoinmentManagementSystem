import WidgetsOnPage from "Components/WidgetsOnPage";
import React, { useState } from "react";
import AppointmentNo from "Pages/PrintAndVerifyAppointment/Widget/AppointmentNo";
import PrintAndView from "Pages/PrintAndVerifyAppointment/Widget/PrintAndView";
import { useParams } from "react-router-dom";

const PrintAndVerifyAppointment = () => {
  const { AID } = useParams();
  const [AIDNo, setAID] = useState(!AID ? "" : AID);
  const [doRetrive, setdoRetrive] = useState(false);
  return (
    <WidgetsOnPage
      title={"Check Your Appointment Details"}
      leftComponent={
        <AppointmentNo
          doRetrive={doRetrive}
          setdoRetrive={setdoRetrive}
          setAID={setAID}
          AIDNo={AIDNo}
        />
      }
      rightComponent={<PrintAndView doRetrive={doRetrive} AIDNo={AIDNo} />}
    />
  );
};

export default PrintAndVerifyAppointment;
