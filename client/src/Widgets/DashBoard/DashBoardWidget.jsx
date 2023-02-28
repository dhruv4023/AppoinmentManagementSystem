import { Box, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";
import { LineC, PieC } from "./Charts";
import TableData from "./TableData";
const DashBoardWidget = ({SID}) => {
  const lineLabel = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const cancelAppointmentData = [11, 7, 3, 9, 5, 6];
  const successAppointmentData = [16, 5, 7, 2, 3];
  const pieData = [
    cancelAppointmentData.reduce((s, a) => s + a, 0),
    successAppointmentData.reduce((s, a) => s + a, 0),
  ];
  return (
    <FlexBetween mt={"0.8rem"} flexDirection={"column"} gap={"0.8rem"}>
      <WidgetWrapper width={"100%"}>
        <Typography
          py={"0.5rem"}
          fontWeight={"bold"}
          fontSize={"1.5rem"}
          color={"primary"}
        >
          DashBoardWidget
        </Typography>
      </WidgetWrapper>
      <TableData SID={SID} />
      <PieC pieData={pieData} />
      <LineC
        lineLabel={lineLabel}
        cancelAppointmentData={cancelAppointmentData}
        successAppointmentData={successAppointmentData}
      />
    </FlexBetween>
  );
};

export default DashBoardWidget;
