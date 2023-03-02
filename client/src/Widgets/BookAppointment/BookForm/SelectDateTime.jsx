import React, { useEffect, useState } from "react";
import FlexBetween from "Components/FlexBetween";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { Button, Divider, useTheme } from "@mui/material";
import FlexEvenly from "Components/FlexEvenly";
import { getBookedDtTm } from "../BookAppoinmentFun";
import Loading from "Components/Loading";
import { MXMNDate } from "state/globalFunctions";
// import Calender from "./Calender";


const SelectDateTime = ({ setDateAndTime, servData }) => {
  const theme = useTheme();

  // const times = ["10", "11", "12", "1", "2", "3", "4"];

  const [date, setDate] = useState(MXMNDate(1).toISOString().substring(0, 10));
  const [time, setTime] = useState("");
  const [bookedDtTm, setBookedDtTm] = useState();
  useEffect(() => {
    getBookedDtTm(setBookedDtTm, servData?.SID);
  }, [servData]);
  // console.log(bookedDtTm);
  // console.log();
  // const bkd =
  //   bookedDtTm &&
  //   bookedDtTm[
  //     date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  //   ];
  // const times =
  //   servData &&
  //     bookedDtTm &&
  //     [
  //       ...timeArray(
  //         servData?.appoinmentTime,
  //         servData?.serviceTime?.Start,
  //         servData?.breakTime?.Start
  //       ),
  //       ...timeArray(
  //         servData?.appoinmentTime,
  //         servData?.breakTime?.End,
  //         servData?.serviceTime?.End
  //       ),
  //     ].filter((f) => !bkd?.includes(f));
  // console.log(times, servData);
  return (
    <FlexBetween gap={"0.5rem"} flexWrap={"wrap"}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          minDate={MXMNDate(1).toISOString().substring(0, 10)}
          maxDate={MXMNDate(7).toISOString().substring(0, 10)}
          value={date}
          onChange={(newValue) => {
            setDate(newValue["$d"]);
          }}
          renderInput={AdapterDayjs}
        />
      </LocalizationProvider>
      {/* <Calender /> */}
      <Divider />
      <FlexEvenly
        width={"100%"}
        overflow={"auto"}
        height={"20rem"}
        flexWrap={"wrap"}
        gap={"0.5rem"}
      >
        {bookedDtTm ? (
          <>
            {bookedDtTm[date]?.map((m) => {
              return (
                <Button
                  key={m}
                  onClick={() => {
                    setTime(m);
                    setDateAndTime({
                      date: date,
                      // date.getFullYear() +
                      // "-" +
                      // (date.getMonth() + 1) +
                      // "-" +
                      // date.getDate(),
                      time: m,
                    });
                  }}
                  sx={{
                    color: time === m && theme.palette.secondary.dark,
                    backgroundColor:
                      time === m
                        ? theme.palette.primary.main
                        : theme.palette.background.default,
                    borderRadius: "1rem",
                    padding: "0.8rem",
                  }}
                >
                  {m}
                </Button>
              );
            })}{" "}
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </FlexEvenly>
    </FlexBetween>
  );
};

export default SelectDateTime;


// const timeArray = (x, startTim, endTim) => {
//   const st = startTim.split(":");
//   const et = endTim.split(":");
//   var startTime = moment().utc().set({ hour: st[0], minute: st[1] });
//   var endTime = moment().utc().set({ hour: et[0], minute: et[1] });
//   var timeStops = [];
//   let tp2, tp;
//   while (true) {
//     tp = new moment(startTime).format("HH:mm");
//     startTime.add(x, "minutes");
//     tp2 = new moment(startTime).format("HH:mm");
//     if (startTime > endTime) break;
//     timeStops.push(tp + "-" + tp2);
//   }
//   return timeStops;
// };