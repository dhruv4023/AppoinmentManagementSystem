import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import React from "react";
import QRWidget from "Widgets/QRWidget";

const PrintPan = ({ details, AUID }) => {
  const theme = useTheme();
  return (
    <>
      <QRWidget
        description={"Scan QR To Open Your Appointment Data"}
        link={`/printreceipt/${details.AID}/${AUID}`}
      />
      {Object.keys(details.details).map((m) => {
        return (
          <FlexBetween key={m}>
            <Typography
              fontSize={"1rem"}
              color={theme.palette.primary.dark}
              fontWeight="500"
              my="0.7rem"
              width={"30%"}
            >
              {String(m).toUpperCase()}
            </Typography>
            <Typography
              flexGrow={"1"}
              fontSize={"1rem"}
              color={theme.palette.primary.dark}
              fontWeight="500"
              my="0.7rem"
            >
              : {details.details[m]}
            </Typography>
          </FlexBetween>
        );
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
