import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";
import DisplayServices from "Widgets/Service/Admin/DisplayService/DisplayServices";

const DisplayFilterData = ({ filteredData }) => {
  const theme = useTheme();
  // console.log(filteredData);
  return (
    <>
      <WidgetWrapper>
        <Typography
          fontWeight={"bold"}
          fontSize={"1.5rem"}
          color={theme.palette.neutral.main}
        >
          Filtered Data
        </Typography>
      </WidgetWrapper>
      {filteredData && <DisplayServices serviceData={filteredData} />}
    </>
  );
};

export default DisplayFilterData;
