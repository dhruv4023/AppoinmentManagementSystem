import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import React from "react";
import { saveAppointmentData } from "./BookAppoinmentFun";

const Confirmation = ({ Details, servData }) => {
  const theme = useTheme();
  const submitFom = () => {
    saveAppointmentData({ Details: Details, id: servData._id });
  };
  return (
    <>
      {Object.keys(Details).map((m) => {
        return (
          <FlexBetween key={m}>
            {" "}
            <Typography
              fontSize={"1rem"}
              color={theme.palette.primary.dark}
              fontWeight="500"
              my="0.7rem"
              width={"30%"}
            >
              {m}
            </Typography>
            <Typography
              flexGrow={"1"}
              fontSize={"1rem"}
              color={theme.palette.primary.dark}
              fontWeight="500"
              my="0.7rem"
            >
              : {Details[m]}
            </Typography>
          </FlexBetween>
        );
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
