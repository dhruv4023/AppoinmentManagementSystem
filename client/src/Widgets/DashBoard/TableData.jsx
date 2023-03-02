import {
  DataArray,
  TableBar,
  TableBarOutlined,
  TableBarSharp,
  TableView,
} from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import { MyBtn } from "Components/MyComponents";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { DDMMYYYY, MXMNDate } from "state/globalFunctions";
import { getAllBookedData } from "./AppointmentData";
import CollapsibleTable, { createData } from "./CollapsibleTable";

const TableData = ({ SID }) => {
  // console.log(SID);
  const [dataList, setDataList] = useState();
  const [selectDate, setSelectDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  useEffect(() => {
    // dataList &&
    getAllBookedData({ SID, date: selectDate }).then((d) => setRows(d.data));
    const setRows = (data) => {
      const rows = [];
      data.map((m) =>
        rows.push(
          createData(
            m.AID,
            m.dateTime?.time,
            m.status,
            m.dateTime?.date,
            m.contactNumber,
            m.email,
            m.message,
            m.name
          )
        )
      );
      // console.log(data, rows);
      setDataList(rows);
    };
  }, [selectDate]);
  // console.log(selectDate, dataList);
  return (
    <WidgetWrapper width={"100%"}>
      <Typography
        py={"0.5rem"}
        fontWeight={"bold"}
        fontSize={"1rem"}
        color={"primary"}
      >
        <TableView />
        Appointments{" "}
      </Typography>
      <FlexBetween gap={"1rem"} py={"1rem"}>
        <TextField
          label={"Select Date"}
          onChange={(e) => setSelectDate(e.target.value)}
          required
          type={"date"}
          InputProps={{
            inputProps: {
              min: MXMNDate(-7).toISOString().substring(0, 10),
              max: MXMNDate(7).toISOString().substring(0, 10),
            },
          }}
          value={selectDate}
        />
      </FlexBetween>
      {dataList && dataList.length !== 0 ? (
        <CollapsibleTable data={dataList} />
      ) : (
        <h4>Data Not Available For Selected Date : {DDMMYYYY(selectDate)}</h4>
      )}
    </WidgetWrapper>
  );
};

export default TableData;
