import { Button, TextField, useTheme } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import FlexEvenly from "Components/FlexEvenly";
import React, { useState } from "react";

const FillDetail = ({ dateAndTime, setDetails, setTabNo, details }) => {
  const { palette } = useTheme();
  const initialValue = {
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  };
  const [values, setValues] = useState(!details ? initialValue : details);
  const onChangehandle = (e, name) => {
    e.preventDefault();
    let tmpData = e.target.value;
    let tmp = {};
    for (let value in values)
      tmp[value] = value === name ? tmpData : values[value];
    setValues(tmp);
  };
  return (
    <FlexBetween flexDirection={"column"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dateAndTime ? setTabNo(2) : setTabNo(0);
          setDetails(values);
        }}
      >
        {Object.keys(values).map((m) => {
          return (
            <TextField
              required
              key={m}
              label={m.toUpperCase()}
              onChange={(e) => onChangehandle(e, m)}
              name={m}
              value={values[m]}
              sx={{ margin: "0.5rem", width: "100%" }}
            />
          );
        })}
        <FlexEvenly width={"100%"}>
          <Button
            type="submit"
            sx={{
              margin: "auto",
              // m: "auto",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
            Save
          </Button>
        </FlexEvenly>
      </form>
    </FlexBetween>
  );
};

export default FillDetail;
