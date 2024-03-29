import { useTheme } from "@emotion/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import { SelectAutoComplete } from "Components/MyComponents";
import WidgetWrapper from "Components/WidgetWrapper";
import { City } from "country-state-city";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getFilteredData } from "Widgets/WidgetFunctions";

const initialValues = {
  Category: "",
  SelectCity: "",
  pincode: "",
};
const FilterWidget = ({ setFilteredData, loading, setLoading }) => {
  const theme = useTheme();
  const categories = useSelector((s) => s.categories);
  // console.log(categories);
  const [values, setValues] = useState(initialValues);

  const setInputVal = (val, name) => {
    let tmp = { ...values };
    tmp[name] = val;
    setValues(tmp);
  };
  // console.log(values);
  // console.log(Country.getCountryByCode("IN"));
  // console.log(State.getStatesOfCountry("IN"));
  // console.log();
  const doFilter = (e) => {
    e.preventDefault();
    if (
      values.Category === "" ||
      (values.SelectCity === "" && values.pincode === "")
    )
      alert("Please select Category and City or Category and Pincode");
    else {
      setLoading(true);
      getFilteredData(values).then((data) => {
        setFilteredData(data);
        setLoading(false);
      });
    }
  };
  return (
    <WidgetWrapper>
      <Box
        width={"100%"}
        p={"1rem 6%"}
        textAlign="center"
        backgroundColor={theme.palette.background}
      >
        <Typography
          fontWeight={"bold"}
          fontSize={"1.5rem"}
          color={theme.palette.neutral.main}
        >
          Filter
        </Typography>
        <form onSubmit={doFilter}>
          <FlexBetween flexDirection={"column"} gap={"1rem"} my={"0.5rem"}>
            <SelectAutoComplete
              msg={"Select Category Name"}
              setInputVal={setInputVal}
              label={"Category"}
              options={categories}
            />
            <SelectAutoComplete
              req={false}
              msg={"Select City Name"}
              label={"Select City"}
              setInputVal={setInputVal}
              options={City.getCitiesOfState("IN", "GJ")
                .map((m) => m.name)
                .filter((f) => !f.includes(","))}
            />
            <TextField
              error={0 < values.pincode.length && values.pincode.length < 6}
              inputProps={{
                minLength: 6,
                maxLength: 6,
              }}
              label="Pincode"
              onChange={(e) => setInputVal(e.target.value, "pincode")}
              name="pincode"
              value={values.pincode}
              sx={{ width: "100%" }}
            />
            <Button
              fullWidth
              disabled={loading}
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.alt,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              Do Filter
            </Button>
          </FlexBetween>
        </form>
      </Box>
    </WidgetWrapper>
  );
};

export default FilterWidget;
