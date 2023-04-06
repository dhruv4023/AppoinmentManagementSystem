import WidgetWrapper from "Components/WidgetWrapper";
import MobileOtp from "Components/MobileOtp/MobileOtp";
import React, { useEffect, useState } from "react";
import { cancelAppointment } from "./PrintCancelVerifyAppointment";
import { Button } from "@mui/material";

const CancelAppointment = ({ number, aid, setCancel, setdoRetrive }) => {
  const [verify, setVerify] = useState(false);
  useEffect(() => {
    verify && cancelAppointment(aid);
    verify && setCancel(false) && setdoRetrive(true);
  }, [verify]);
// console.log(aid)
  return (
    <WidgetWrapper marginTop={"1rem"}>
      <MobileOtp
        mobileNo={number}
        setVerified={setVerify}
        btnValue={"Verify Otp and Cancel Appointment"}
      />
      <div id="sign-in-button"></div>
    </WidgetWrapper>
  );
};

export default CancelAppointment;
