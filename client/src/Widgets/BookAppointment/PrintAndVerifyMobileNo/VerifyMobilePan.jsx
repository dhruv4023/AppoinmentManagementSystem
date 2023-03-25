import React, { useEffect, useState } from "react";
import MobileOtp from "Components/MobileOtp/MobileOtp";
import { saveAppointmentData } from "../BookAppoinmentFun";

const VerifyMobilePan = ({ setAID, appointmentData, setTabNo }) => {
  const [verified, setVerified] = useState(0);
  // const [capchaRender, setCapchaRender] = useState(true);
  // console.log(appointmentData?.details.contactNumber);
  useEffect(() => {
    verified === 1 &&
      saveAppointmentData(appointmentData).then((AID) => {
        setAID(AID);
        AID && setTabNo(1);
      });
    verified === -1 && alert("Wrong OTP");
  }, [verified]);
  return (
    <>
      <MobileOtp
        mobileNo={appointmentData?.details.contactNumber}
        setVerified={setVerified}
        // capchaRender={capchaRender}
        // setCapchaRender={setCapchaRender}
        btnValue={"Verify OTP"}
      />
      {/* {capchaRender &&  */}
      <div id="sign-in-button"></div>
      {/* } */}
    </>
  );
};

export default VerifyMobilePan;
