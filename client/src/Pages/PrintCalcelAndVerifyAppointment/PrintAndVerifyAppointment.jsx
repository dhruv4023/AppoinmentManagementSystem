import WidgetsOnPage from "Components/WidgetsOnPage";
import React, { useState } from "react";

import { useParams } from "react-router-dom";
import AppointmentNo from "./Widget/AppointmentNo";
import CancelAppointment from "./Widget/CancelAppointment";
import PrintAndView from "./Widget/PrintAndView";

const PrintAndVerifyAppointment = () => {
  const { AID } = useParams();
  const [AIDNo, setAID] = useState(!AID ? "" : AID);
  const [doRetrive, setdoRetrive] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <WidgetsOnPage
      title={"Check Your Appointment Details"}
      leftComponent={
        <AppointmentNo
          doRetrive={doRetrive}
          setdoRetrive={setdoRetrive}
          setAID={setAID}
          loading={loading}
          AIDNo={AIDNo}
        />
      }
      rightComponent={
        <>
          {cancel ? (
            <CancelAppointment
              setCancel={setCancel}
              number={cancel}
              AID={AIDNo}
            />
          ) : (
            <PrintAndView
              loading={loading}
              setLoading={setLoading}
              doRetrive={doRetrive}
              setCancel={setCancel}
              AIDNo={AIDNo}
            />
          )}
        </>
      }
    />
  );
};

export default PrintAndVerifyAppointment;
