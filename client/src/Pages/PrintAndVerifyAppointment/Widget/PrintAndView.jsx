import { useTheme } from "@emotion/react";
import { Bookmark } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import { DisplayDataComp } from "Components/MyComponents";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { DDMMYYYY } from "state/globalFunctions";
import QRWidget from "Widgets/QRWidget";
import { getSinglebookedData } from "./PrintAndVerifyAppointment";

const PrintAndView = ({ AIDNo, doRetrive }) => {
  const theme = useTheme();
  const [apDt, setApDt] = useState();
  const [dateTime, setdateTime] = useState();
  useEffect(() => {
    AIDNo &&
      getSinglebookedData(AIDNo).then((d) => {
        setdateTime(d.data.dateTime);
        delete d.data.status;
        delete d.data.dateTime;
        delete d.data._id;
        setApDt(d.data);
      });
  }, [doRetrive]);
  return (
    <WidgetWrapper>
      <Typography
        fontSize={"1.5rem"}
        color={"primary"}
        fontWeight="500"
        width={"100%"}
      >
        <Bookmark /> Your Appointment Receipt
      </Typography>
      {apDt && (
        <>
          {Object.keys(apDt).map((m) => {
            return <DisplayDataComp ky={m} value={apDt[m]} />;
          })}
          <DisplayDataComp ky={"TIME"} value={dateTime.time} />
          <DisplayDataComp ky={"DATE"} value={DDMMYYYY(dateTime.date)} />
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
