import { useTheme } from "@emotion/react";
import { Button, TextField, Typography } from "@mui/material";
import FlexEvenly from "Components/FlexEvenly";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { register } from "./functions";
const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const values = location.state;
  const { palette } = useTheme();
  useEffect(() => {
    // !values && navigate("/", { state: null });
  });
  const sentOTP = 145678; //Math.floor(Math.random() * 1000000);
  // const sentMail = () => {
  //   console.log(sentOTP);
  // };
  const [otp, setOtp] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otp, sentOTP);
    if (otp == sentOTP) {
      register(values)
        ? alert("Registered Successfully")
        : alert("Registration Failed");
      navigate("/", { state: null });
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <>
      Email OTP Verification
      <FlexEvenly>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="standard"
            label={"Enter OTP here"}
            required
            type={"number"}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
            Verify
          </Button>
        </form>
      </FlexEvenly>
    </>
  );
};

export default EmailVerification;
