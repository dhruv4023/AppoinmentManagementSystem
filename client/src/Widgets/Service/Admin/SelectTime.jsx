import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FlexEvenly from "Components/FlexEvenly";
import moment from "moment";
import React, { useEffect, useState } from "react";

const makeTimeSlote = (duration, startTime, endTime) => {
  var timeStops = [];
  while (startTime <= endTime) {
    timeStops.push(new moment(startTime).format("HH:mm"));
    startTime.add(duration, "minutes");
  }
  return timeStops;
};
const timeSlotes = (h = 6, e = 21) => {
  var startTime = moment().utc().set({ hour: h, minute: 0 });
  var endTime = moment().utc().set({ hour: e, minute: 59 });
  return makeTimeSlote("60", startTime, endTime);
};

const SelectTime = ({ time, inputValues, label, sH = 6, eH = 21 }) => {
  const initialLocation = {
    start: time ? time.start : "",
    end: time ? time.end : "",
  };
  const [values, setValues] = useState(initialLocation);
  //   console.log(values);
  const onChangehandle = (val, name) => {
    let tmp = { ...values };
    tmp[name] = val;
    setValues(tmp);
  };
  useEffect(() => {
    inputValues(values, label + "Time");
  }, [values]);
  // console.log(values);
  return (
    <>
      <FlexEvenly sx={{ my: "0.5rem" }} width={"100%"}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="category">{label} start Time</InputLabel>
          <Select
            required
            sx={{ marginRight: "0.3rem" }}
            onChange={(e) => onChangehandle(e.target.value, "start")}
            value={values.start}
            label={"Service start Time"}
          >
            {timeSlotes(sH, eH)?.map((m) => (
              <MenuItem value={m} key={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="category">{label} end Time</InputLabel>
          <Select
            required
            sx={{ marginLeft: "0.3rem" }}
            onChange={(e) => onChangehandle(e.target.value, "end")}
            disabled={!values.start}
            value={values.end}
            label={"Service end Time"}
          >
            {timeSlotes(parseInt(values.start?.split(":")[0]) + 1, eH)?.map(
              (m) => (
                <MenuItem value={m} key={m}>
                  {m}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </FlexEvenly>{" "}
    </>
  );
};

export default SelectTime;
