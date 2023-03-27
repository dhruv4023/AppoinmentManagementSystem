import React, { useEffect, useState } from "react";
import FlexBetween from "Components/FlexBetween";
import { SelectAutoComplete } from "Components/MyComponents";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers";
import {
  Button,
  Divider,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexEvenly from "Components/FlexEvenly";
import { getBookedDtTm } from "../BookAppoinmentFun";
import { MXMNDate } from "state/globalFunctions";
import Loading from "Components/Loader/Loading";
// import Calender from "./Calender";

const changePickCalanderDateToISOdate = (date) => {
  return (
    date["$y"] +
    "-" +
    (String(date["$M"] + 1).length === 1
      ? "0" + (date["$M"] + 1)
      : date["$M"] + 1 + "") +
    "-" +
    (String(date["$D"]).length === 1 ? "0" + date["$D"] : date["$D"] + "")
  );
};
const SelectDateTime = ({ setDateAndTime, servData }) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 475px)");

  // const times = ["10", "11", "12", "1", "2", "3", "4"];

  const [date, setDate] = useState(MXMNDate(1).toISOString().substring(0, 10));
  const [time, setTime] = useState("");
  const [bookedDtTm, setBookedDtTm] = useState();
  const [BookingDate, setBookingDate] = useState();
  useEffect(() => {
    getBookedDtTm(servData?.SID).then((t) => {
      setBookedDtTm(t);
      setBookingDate(Object.keys(t));
    });
  }, [servData]);

  return (
    <FlexBetween gap={"0.5rem"} flexWrap={"wrap"}>
      {isNonMobileScreens ? (
        <FlexEvenly width={"100%"}>
           
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              minDate={MXMNDate(1).toISOString().substring(0, 10)}
              maxDate={MXMNDate(7).toISOString().substring(0, 10)}
              value={date}
              onChange={(newValue) => {
                setDate(changePickCalanderDateToISOdate(newValue));
              }}
              renderInput={AdapterDayjs}
            />
          </LocalizationProvider>
        </FlexEvenly>
      ) : (
        <FlexEvenly paddingY={"1rem"} width={"100%"}>
          {BookingDate ? (
            <Select
              required
              onChange={(e) => setDate(e.target.value)}
              value={date}
            >
              {BookingDate.map((m) => (
                <MenuItem value={m} key={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Loading />
          )}
        </FlexEvenly>
      )}
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
