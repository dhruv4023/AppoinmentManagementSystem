import { Grid, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import FlexBetween from "Components/FlexBetween";
import FlexEvenly from "Components/FlexEvenly";
import moment from "moment";
import React from "react";
const days = ["S", "M", "T", "W", "T", "F", "S"];
const calendar = () => {
  const calendar = [];
  const today = moment();
  let dy = today.day();
  let dt = today.date();
  //   let mn = ;
  //   console.log(today.format("DD-MM-YYYY") + " " + days[today.day()]);
  let arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push(days[(dy + 1 + i) % 7]);
  }
  calendar.push(arr);
  for (let i = 0; i < 4; i++) {
    let arr = [];
    for (let j = 0; j < 7; j++) {
      arr.push(today.add(1, "day").date());
    }
    calendar.push(arr);
  }
  //   console.log(calendar);
  //   console.log(calendar);
  //   console.log(today.calendar("DD-MM-YYYY"));

  //   const startDay = today.clone().startOf("month").startOf("week");
  //   const endDay = today.clone().endOf("month").endOf("week");
  //   let date = startDay.clone().subtract(1, "day");
  //   while (date.isBefore(endDay, "day"))
  //     calendar.push({
  //       days: Array(7)
  //         .fill(0)
  //         .map(() => date.add(1, "day").clone()),
  //     });
  return calendar;
};
const Calender = () => {
  const mnDate = new Date();
  mnDate.setDate(mnDate.getDate() + 1);
  const minDate = mnDate;

  const mxDate = new Date();
  mxDate.setDate(mxDate.getDate() + 7);
  const maxDate = mxDate;
  //   console.log(mxDate, mnDate);
  const mm = mnDate.getMonth();
  //   console.log(mm);
  console.log(calendar());

  return (
    <FlexBetween width={"50%"} border={"1px solid red"}>
      {/* <Grid spacing={{ xs: 1, md: 1 }} columns={{ md: 5 }}>
        {Array.from(Array(7 * 5)).map((_, index) => (
          <Grid item xs={1} sm={1} md={1} key={index}>
            <ListItem sx={{ border: "1px solid red" }}>2</ListItem>
          </Grid>
        ))}
      </Grid> */}
      {calendar().map((m) => {
        return (
          <FlexEvenly flexDirection={"column"}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              //  console.log(m[i])
              return <FlexEvenly>{m[i]}</FlexEvenly>;
            })}
          </FlexEvenly>
        );
      })}
    </FlexBetween>
  );
};

export default Calender;
