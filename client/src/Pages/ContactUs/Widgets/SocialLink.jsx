import { Typography } from "@mui/material";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

const SocialLink = () => {
  return (
    <WidgetWrapper>
      {" "}
      <Typography
        py={"0.5rem"}
        fontWeight={"bold"}
        fontSize={"1.5rem"}
        color={"primary"}
      >
        Social Links
      </Typography>
    </WidgetWrapper>
  );
};

export default SocialLink;
