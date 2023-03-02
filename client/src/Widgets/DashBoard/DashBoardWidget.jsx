import { Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { getYearlydata } from "./ChartData";
import { LineC, PieC } from "./Charts";
import TableData from "./TableData";

const DashBoardWidget = ({ SID }) => {
  const [lineLbl, setLineLbl] = useState();
  const [cancelData, setCancelData] = useState();
  const [successData, setsuccessData] = useState();
  const [leftBookData, setLeftBookData] = useState();
  useEffect(() => {
    const l = [];
    const cad = [];
    const sad = [];
    const ltb = [];
    getYearlydata({ SID, yr: "2020", yr2: "2021" }).then((m) => {
      // console.log(m.data);
      m.data.map((x) => {
        l.push(x.value);
        cad.push(x.total[0]);
        sad.push(x.total[1]);
        ltb.push(x.total[2]);
      });
      setLineLbl(l);
      setCancelData(cad);
      setsuccessData(sad);
      setLeftBookData(ltb);
    });
  }, []);
  console.log(cancelData, successData, leftBookData, lineLbl);
  const lineLabel = lineLbl;
  //  [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];
  const cancelAppointmentData = cancelData; // [11, 7, 3, 9, 5, 6, 9, 11];
  const successAppointmentData = successData; // [16, 5, 7, 2, 7, 3, 9, 10];
  const leftToBook = leftBookData; // [5, 2, 3, 15, 2, 5, 9, 12];

  const pieData = [
    cancelAppointmentData?.reduce((s, a) => s + a, 0),
    successAppointmentData?.reduce((s, a) => s + a, 0),
    leftToBook?.reduce((s, a) => s + a, 0),
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
      {lineLabel && (
        <>
          <PieC pieData={pieData} />
          <LineC
            lineLabel={lineLabel}
            cancelAppointmentData={cancelAppointmentData}
            successAppointmentData={successAppointmentData}
            leftToBook={leftToBook}
          />
        </>
      )}
    </FlexBetween>
  );
};

export default DashBoardWidget;
