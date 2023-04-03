import { Typography } from "@mui/material";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

const Instruction = ({ instruction, step }) => {
  return (
    <WidgetWrapper marginBottom={"1rem"}>
      <Typography
        py={"0.5rem"}
        fontWeight={"bold"}
        fontSize={"1rem"}
        color={"primary"}
      >
        Step {step}
      </Typography>
      {instruction}
    </WidgetWrapper>
  );
};

export default Instruction;
