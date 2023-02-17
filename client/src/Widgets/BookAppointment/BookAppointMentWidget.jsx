import { PushPin } from "@mui/icons-material";
import { Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import React, { useState } from "react";
import BookForm from "./BookForm/BookForm";
import VerifyPrint from "./PrintAndVerifyMobileNo/VerifyPrint";

const BookAppointMentWidget = ({ servData }) => {
  const [appointmentData, setAppointmentData] = useState();
  // const [isVerify, setIsVerify] = useState(undefined);
  // console.log(servData);
  // console.log(appointmentData);
  return (
    <FlexBetween flexDirection={"column"}>
      <Typography
        component={"span"}
        gap={"0.5rem"}
        width={"100%"}
        color={"primary"}
        variant="h3"
      >
        <PushPin />
        Book Your Appoinment
      </Typography>
      {appointmentData ? (
        <VerifyPrint appointmentData={appointmentData} />
      ) : (
        <BookForm servData={servData} setAppointmentData={setAppointmentData} />
      )}
    </FlexBetween>
  );
};

export default BookAppointMentWidget;
