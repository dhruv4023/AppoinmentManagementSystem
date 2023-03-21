import { Button, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { getDailydata, getMonthlydata, getYearlydata } from "./ChartData";
import { LineC, PieC } from "./Charts";
import TableData from "./TableData";

const DashBoardWidget = ({ SID }) => {
  const [lineLbl, setLineLbl] = useState();
  const [cancelData, setCancelData] = useState();
  const [successData, setsuccessData] = useState();
  // const [leftBookData, setLeftBookData] = useState();
  const [chartType, setChartType] = useState(0);
  // console.log(chartType);
  const l = [];
  const cad = [];
  const sad = [];
  // const ltb = [];
  const changeChartData = (m) => {
    // console.log(m);
    m.map((x) => {
      l.push(x.value);
      sad.push(x.total[0]);
      cad.push(x.total[1]);
      // ltb.push(x.total[2]);
    });
    setLineLbl(l);
    setCancelData(cad);
    setsuccessData(sad);
    // setLeftBookData(ltb);
  };
  useEffect(() => {
    // getYearlydata({
    //   SID,
    //   yr: "2023",
    //   yr2: "" + new Date().getFullYear(),
    // }).then((m) => changeChartData(m.data));
    chartType === 0
      ? getYearlydata({
          SID,
          yr: "2023",
          yr2: "" + new Date().getFullYear(),
        }).then((m) => changeChartData(m.data))
      : chartType === 1
      ? getMonthlydata({ SID, yr: "" + new Date().getFullYear() }).then((m) =>
          changeChartData(m.data)
        )
      : getDailydata({ SID, yr: "" + new Date().getFullYear() }).then((m) =>
          changeChartData(m.data)
        );
  }, [chartType]);
  const changeChartDataByFun = () => {};
  // console.log(chartType,cancelData, successData, leftBookData, lineLbl);
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
  // const leftToBook = leftBookData; // [5, 2, 3, 15, 2, 5, 9, 12];

  const pieData = [
    cancelAppointmentData?.reduce((s, a) => s + a, 0),
    successAppointmentData?.reduce((s, a) => s + a, 0),
    // leftToBook?.reduce((s, a) => s + a, 0),
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
      <WidgetWrapper width={"100%"}>
        <Typography
          py={"0.5rem"}
          fontWeight={"bold"}
          fontSize={"1.5rem"}
          color={"primary"}
        >
          Select Chart Data
        </Typography>
        <Button
          onClick={() => {
            setChartType(0);
            changeChartDataByFun();
          }}
          disabled={chartType === 0}
        >
          Yearly
        </Button>
        <Button
          onClick={() => {
            setChartType(1);
            changeChartDataByFun();
          }}
          disabled={chartType === 1}
        >
          Monthly
        </Button>
        <Button
          onClick={() => {
            setChartType(2);
            changeChartDataByFun();
          }}
          disabled={chartType === 2}
        >
          Daily
        </Button>
      </WidgetWrapper>
      {lineLabel && (
        <>
          <PieC pieData={pieData} />
          <LineC
            lineLabel={lineLabel}
            cancelAppointmentData={cancelAppointmentData}
            successAppointmentData={successAppointmentData}
            // leftToBook={leftToBook}
          />
        </>
      )}
    </FlexBetween>
  );
};

export default DashBoardWidget;
