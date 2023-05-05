import { useTheme } from "@emotion/react";
import { Bookmark, Cancel, Delete, TramSharp } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import Loading from "Components/Loader/Loading";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSinglebookedData } from "./PrintCancelVerifyAppointment";
import PrintData from "./PrintData";

const PrintAndView = ({ loading, setLoading, AIDNo, doRetrive, setCancel }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [apDt, setApDt] = useState();
  useEffect(() => {
    setLoading(true);
    AIDNo
      ? getSinglebookedData(AIDNo)
          .then((d) => {
            if (d.data === "Error") {
              setApDt(false);
            } else {
              delete d.data._id;
              setApDt(d.data);
            }
            setLoading(false);
          })
          .catch((e) => {
            setApDt(false);
            setLoading(false);
          })
      : setLoading(false);
  }, [doRetrive]);
  // console.log(apDt, loading);
  return (
    <WidgetWrapper>
      {loading && <Loading />}
      {apDt && (
        <>
          <PrintData data={apDt} />
          <FlexBetween paddingX={"2rem"}>
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
            <Button
              type="submit"
              onClick={() => setCancel(apDt.contactNumber)}
              disabled={apDt.status !== 0}
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "red",
                color: "White",
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: "#800b0b",
                },
              }}
            >
              <Cancel /> Cancel
            </Button>
          </FlexBetween>
        </>
      )}
      {apDt === false ? (
        <>No Appointment Record Found</>
      ) : (
        apDt === undefined &&
        "Enter Your Appointment Number to Check Yout Appointment Details"
      )}
    </WidgetWrapper>
  );
};

export default PrintAndView;
