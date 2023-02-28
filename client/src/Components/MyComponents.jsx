import { useTheme } from "@emotion/react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { City } from "country-state-city";
import React, { useEffect, useState } from "react";
import FlexBetween from "./FlexBetween";
import FlexEvenly from "./FlexEvenly";
export const SelectAutoComplete = ({ setInputVal, options, label, value }) => {
  return (
    <Autocomplete
      sx={{ width: "100%" }}
      options={options}
      autoHighlight
      value={value}
      getOptionLabel={(option) => option}
      onInputChange={(e, newInputValue) => {
        setInputVal(newInputValue, String(label).replace(" ", ""));
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ width: "100%" }}
          // sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          required
          value={value}
          {...params}
          label={
            String(label).charAt(0).toUpperCase() + String(label).substring(1)
          }
        />
      )}
    />
  );
};

export const SelectLocation = ({ location, inputValues }) => {
  const initialLocation = {
    city: location ? location.city : "",
    pincode: location ? location.pincode : "",
    district: location ? location.district : "",
    state: "Gujarat",
  };
  // console.log(location);
  const [values, setValues] = useState(initialLocation);
  const onChangehandle = (val, name) => {
    // e.preventDefault();
    let tmp = { ...values };
    // console.log(val);
    tmp[name] = val;
    setValues(tmp);
  };
  useEffect(() => {
    inputValues(values, "location");
  }, [values]);
  // console.log(values);
  return (
    <>
      <FlexEvenly gap={"1rem"} width={"100%"}>
        <TextField
          required
          label="State"
          onChange={(e) => onChangehandle(e.target.value, "state")}
          name="state"
          value={values.state}
          disabled={true}
          sx={{ flexGrow: 1 }}
        />
        {/* <TextField
          required
          label="District"
          onChange={(e) => onChangehandle(e.target.value, "district")}
          name="district"
          value={values.district}
          sx={{ margin: "0.5rem", width: "100%" }}
        /> */}
        <Box sx={{ flexGrow: 1 }}>
          <SelectAutoComplete
            label={"city"}
            value={values.city}
            setInputVal={onChangehandle}
            options={City.getCitiesOfState("IN", "GJ")
              .map((m) => m.name)
              .filter((f) => !f.includes(","))}
          />
        </Box>
        {/* <TextField
              required
              label="City"
              onChange={(e) => onChangehandle(e.target.value, "city")}
              name="city"
              value={values.city}
              sx={{ margin: "0.5rem", width: "100%" }}
            /> */}
        <TextField
          required
          label="Pincode"
          onChange={(e) => onChangehandle(e.target.value, "pincode")}
          name="pincode"
          value={values.pincode}
          sx={{ flexGrow: 1 }}
        />
      </FlexEvenly>
    </>
  );
};

export const MyTextField = ({ name, val, setInputVal }) => {
  const nm = String(name);
  return (
    <TextField
      key={name}
      label={nm.charAt(0).toUpperCase() + nm.substring(1)}
      onChange={(e) => setInputVal(e.target.value, name)}
      name="Name"
      required
      value={val}
      sx={{ width: "100%" }}
    />
  );
};

export const MyBtn = ({ onclickHandle, label = "x" }) => {
  const theme = useTheme();
  return (
    <Button
      fullWidth
      type="submit"
      onClick={onclickHandle}
      sx={{
        m: "1.2rem 0",
        p: "1rem",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.alt,
        "&:hover": { color: theme.palette.primary.main },
      }}
    >
      {label}
    </Button>
  );
};
export const DisplayDataComp = ({ ky, value }) => {
  const theme = useTheme();
  console.log(ky, value);
  return (
    <>
      <FlexBetween my={"0.5rem"} flexWrap={"wrap"}>
        <Typography
          fontSize={"1rem"}
          color={theme.palette.primary.alt}
          fontWeight="500"
          width={"10rem"}
        >
          {String(ky).toUpperCase()}
        </Typography>
        <Typography
          width={"70%"}
          flexGrow={"1"}
          fontSize={"1rem"}
          color={theme.palette.primary.dark}
          fontWeight="500"
        >
          : {value}
        </Typography>
      </FlexBetween>
    </>
  );
};
