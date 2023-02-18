import { useTheme } from "@emotion/react";
import { Button, TextField } from "@mui/material";
import FlexEvenly from "Components/FlexEvenly";
import { sendOtp, verifyOtp } from "Components/MobileOtp/mobileOtpFuns";
import React, { useEffect, useState } from "react";

const VerifyMobilePan = ({ mobileNo, setVerified }) => {
  const theme = useTheme();
  const [otp, setOtp] = useState(0);
  const [sendotpAgain, setSendotpAgain] = useState(false);
  // useEffect(() => {
  //   sendOtp(mobileNo); // to sent otp
  // }, [sendotpAgain]);
  // if (sendotpAgain) {
  // setSendotpAgain(false);
  // sendOtp(mobileNo);
  // }
  const handleOtpVerify = (e) => {
    e.preventDefault();
    verifyOtp(otp, setVerified);
  };
  return (
    <>
      Mobile OTP Verification
      <FlexEvenly flexDirection={"column"}>
        <TextField value={mobileNo} disabled />
        <TextField
          variant="standard"
          label={"Enter OTP here"}
          required
          type={"text"}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          fullWidth
          type="submit"
          onClick={handleOtpVerify}
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.alt,
            "&:hover": { color: theme.palette.primary.main },
          }}
        >
          Verify
        </Button>
        <Button
          disabled={sendotpAgain}
          onClick={() => {
            // setCapchaRender(!capchaRender);
            setSendotpAgain(true); 
            sendOtp(mobileNo);
          }}
        >
          Sent Otp
        </Button>
      </FlexEvenly>
    </>
  );
};

export default VerifyMobilePan;
