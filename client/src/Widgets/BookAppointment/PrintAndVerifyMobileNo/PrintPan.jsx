import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import { DisplayDataComp } from "Components/MyComponents";
import PrintData from "Pages/PrintCalcelAndVerifyAppointment/Widget/PrintData";
import React from "react";
import { useNavigate } from "react-router-dom";
import QRWidget from "Widgets/QRWidget";

const PrintPan = ({ details, aid }) => {
  const theme = useTheme();
  details.details["aid"] = aid;
  details.details["status"] = 0;
  details.details["dateTime"] = {
    date: details.details["date"],
    time: details.details["time"],
  };
  const navigate = useNavigate();
  return (
    <>
      <QRWidget
        description={"Scan QR To Open Your Appointment Data"}
        link={`printreceipt/${aid}`}
      />
      <PrintData data={details.details} />
      <Button
        type="submit"
        onClick={() => navigate("/preview", { state: details.details })}
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
