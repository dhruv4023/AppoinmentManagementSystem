import { useTheme } from "@emotion/react";
import { Bookmark } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSinglebookedData } from "./PrintAndVerifyAppointment";
import PrintData from "./PrintData";

const PrintAndView = ({ AIDNo, doRetrive }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [apDt, setApDt] = useState();
  useEffect(() => {
    AIDNo &&
      getSinglebookedData(AIDNo).then((d) => {
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
          <PrintData data={apDt} />
          <Button
            type="submit"
            onClick={() => navigate("/preview", { state: apDt })}
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

          {/* <PDFComponent
            ComponentToPrint={
              <>
                <Typography
                  fontSize={"1rem"}
                  color={"primary"}
                  fontWeight="500"
                  width={"100%"}
                >
                  <Bookmark /> Your Appointment Receipt
                </Typography>
                {Object.keys(apDt).map((m) => {
                  return (
                    <DisplayDataComp fontSz="8px" ky={m} value={apDt[m]} />
                  );
                })}
                <DisplayDataComp
                  ky={"TIME"}
                  fontSz="8px"
                  value={dateTime.time}
                />
                <DisplayDataComp
                  ky={"DATE"}
                  fontSz="8px"
                  value={DDMMYYYY(dateTime.date)}
                />
              </>
            }
            cd={<QRCode value="xyz" size={50} id={"qrcode"} />}
            link={`printreceipt/${AIDNo}`}
          /> */}
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
