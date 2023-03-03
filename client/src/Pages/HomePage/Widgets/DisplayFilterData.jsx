import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import Loading from "Components/Loading";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";
import DisplayServices from "Widgets/Service/Admin/DisplayService/DisplayServices";

const DisplayFilterData = ({ filteredData, loading }) => {
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
          Services as per your Filter
        </Typography>
      </WidgetWrapper>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {filteredData === "" ? (
            <h3>Select Filters To get Service </h3>
          ) : filteredData.length === 0 ? (
            <h3>No Service as per your Selected filter </h3>
          ) : (
            <DisplayServices serviceData={filteredData} />
          )}
        </>
      )}
    </>
  );
};

export default DisplayFilterData;
