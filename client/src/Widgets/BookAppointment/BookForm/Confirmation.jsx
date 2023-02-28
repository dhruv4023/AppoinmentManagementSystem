import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import { DisplayDataComp } from "Components/MyComponents";
import React from "react";
import { checkWhetherAppointmentAlredyBooked } from "../BookAppoinmentFun";

const Confirmation = ({ details, servData, setAppointmentData }) => {
  const theme = useTheme();
  const submitFom = () => {
    checkWhetherAppointmentAlredyBooked({
      contactNumber: details.contactNumber,
      SID: servData.SID,
    }).then((alredyBooked) => {
      // console.log(alredyBooked)
      !alredyBooked &&
        setAppointmentData({ details: details, SID: servData.SID });
    });
  };
  return (
    <>
      {Object.keys(details).map((m) => {
        return <DisplayDataComp ky={m} value={details[m]} />;
      })}
      <Button
        type="submit"
        onClick={() => submitFom()}
        sx={{
          m: "2rem 0",
          p: "1rem",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.background.alt,
          "&:hover": { color: theme.palette.primary.main },
        }}
      >
        Confirm Appoinment
      </Button>
    </>
  );
};

export default Confirmation;
