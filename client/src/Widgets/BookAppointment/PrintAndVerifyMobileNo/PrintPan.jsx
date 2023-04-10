import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import PrintData from "Pages/PrintCalcelAndVerifyAppointment/Widget/PrintData";
import React from "react";
import { useNavigate } from "react-router-dom";

const PrintPan = ({ details, aid }) => {
  const theme = useTheme();
  details.details["aid"] = aid;
  details.details["status"] = 0;
  // console.log(details)
  const navigate = useNavigate();
  return (
    <>
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
