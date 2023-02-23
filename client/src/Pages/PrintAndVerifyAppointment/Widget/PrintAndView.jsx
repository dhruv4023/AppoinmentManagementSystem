import { useTheme } from "@emotion/react";
import { Bookmark } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import QRWidget from "Widgets/QRWidget";
import { getSinglebookedData } from "./PrintAndVerifyAppointment";

const PrintAndView = ({ AIDNo, doRetrive }) => {
  const theme = useTheme();
  const [apDt, setApDt] = useState();
  useEffect(() => {
    AIDNo && getSinglebookedData(AIDNo).then((d) => setApDt(d.data));
  }, [doRetrive]);
  console.log(apDt, AIDNo);
  return (
    <WidgetWrapper>
      <Typography
        fontSize={"1.5rem"}
        color={"primary"}
        fontWeight="500"
        width={"100%"}
      >
       <Bookmark/>  Your Appointment Receipt
      </Typography>
      {apDt && (
        <>
          {Object.keys(apDt).map((m) => {
            return (
              <FlexBetween my={"0.5rem"} key={m} flexWrap={"wrap"}>
                <Typography
                  fontSize={"1rem"}
                  color={theme.palette.primary.alt}
                  fontWeight="500"
                  width={"10rem"}
                >
                  {String(m).toUpperCase()}
                </Typography>
                <Typography
                  width={"70%"}
                  flexGrow={"1"}
                  fontSize={"1rem"}
                  color={theme.palette.primary.dark}
                  fontWeight="500"
                >
                  : {apDt[m]}
                </Typography>
              </FlexBetween>
            );
          })}
          <QRWidget
            description={"Scan QR To Open Your Appointment Data"}
            link={`printreceipt/${AIDNo}`}
          />
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
      )}
      {apDt === false ? (
        <>Not Found</>
      ) : (
        apDt === undefined &&
        "Enter Your Appointment No to Check Yout Appointment Details"
      )}
    </WidgetWrapper>
  );
};

export default PrintAndView;
