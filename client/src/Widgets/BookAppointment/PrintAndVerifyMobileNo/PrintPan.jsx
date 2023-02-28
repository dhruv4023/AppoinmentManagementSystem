import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import { DisplayDataComp } from "Components/MyComponents";
import React from "react";
import QRWidget from "Widgets/QRWidget";

const PrintPan = ({ details, AID }) => {
  const theme = useTheme();
  details.details["AID"] = AID;
  return (
    <>
      <QRWidget
        description={"Scan QR To Open Your Appointment Data"}
        link={`printreceipt/${AID}`}
      />
      {Object.keys(details.details).map((m) => {
        return <DisplayDataComp ky={m} value={details.details[m]} />;
      })}
      <Button
        type="submit"
        sx={{
          m: "2rem 0",
          p: "1rem",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.background.alt,
          "&:hover": { color: theme.palette.primary.main },
        }}
      >
        Print
      </Button>
    </>
  );
};

export default PrintPan;
