import React from "react";
import {
  Description,
  DinnerDining,
  EditOutlined,
  HolidayVillage,
  LocationOnOutlined,
  TimelapseRounded,
  Timeline,
  WorkOutline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import WidgetWrapper from "Components/WidgetWrapper";
import { useTheme } from "@emotion/react";
import ServiceDatRow from "./ServiceDatRow";
const DisplayServiceWidget = ({ servData, CrudServData, setCrudServData }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const main = theme.palette.neutral.main;
  // console.log(servData)
  const edtDt = (m) => {
    return {
      SID: m.SID,
      category: m.category,
      serviceName: m.serviceName,
      description: m.description,
      serviceStartTime: m?.serviceTime?.Start,
      serviceEndTime: m?.serviceTime?.End,
      breakStartTime: m?.breakTime?.Start,
      breakEndTime: m?.breakTime?.End,
      appoinmentTime: m.appoinmentTime,
      username: m.username,
      location: m.location,
      holidays: m?.holidays,
    };
  };
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <WidgetWrapper key={servData?.SID} m={"0.5rem 0 0  0"}>
      <FlexBetween flexDirection={"column"}>
        <FlexBetween width={"100%"}>
          <Button
            onClick={() =>
              navigate(`/service/${servData.username}/${servData.category}`)
            }
          >
            <Typography flexGrow={1} color={"primary"} variant="h3">
              {servData?.category + " - " + servData?.serviceName}
            </Typography>
          </Button>
          {CrudServData && (
            <IconButton
              disabled={CrudServData.openForm}
              onClick={() => {
                setCrudServData({
                  openForm: true,
                  data: edtDt(servData),
                });
              }}
            >
              <EditOutlined />
            </IconButton>
          )}
        </FlexBetween>
        <FlexBetween flexDirection={"column"} width={"100%"}>
          <ServiceDatRow
            cel1={servData?.category}
            icon1={<WorkOutline fontSize="large" sx={{ color: main }} />}
            cel2={servData?.description}
            icon2={<Description fontSize="large" sx={{ color: main }} />}
          />
          <ServiceDatRow
            cel1={servData?.appoinmentTime}
            icon1={<Timeline fontSize="large" sx={{ color: main }} />}
            cel2={
              servData.location?.city +
              " " +
              servData.location?.state +
              ", " +
              servData.location?.pincode
            }
            icon2={<LocationOnOutlined fontSize="large" sx={{ color: main }} />}
          />
          <ServiceDatRow
            cel1={
              servData?.serviceTime?.Start + " " + servData?.serviceTime?.End
            }
            icon1={<TimelapseRounded fontSize="large" sx={{ color: main }} />}
            cel2={servData?.breakTime?.Start + " " + servData?.breakTime?.End}
            icon2={<DinnerDining fontSize="large" sx={{ color: main }} />}
          />
          <ServiceDatRow
            cel1={
              <Box gap={"0.2rem"} display={"flex"}>
                {days.map((m, i) => (
                  <>
                    {servData?.holidays.indexOf(i) === -1 ? (
                      <Box >{m}</Box>
                    ) : (
                      <Box color="red">{m}</Box>
                    )}
                  </>
                ))}
              </Box>
            }
            icon1={<HolidayVillage fontSize="large" sx={{ color: main }} />}
          />
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default DisplayServiceWidget;
