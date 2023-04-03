import { useTheme } from "@emotion/react";
import { ArrowLeft, ArrowRight, Forward } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";

import FlexEvenly from "Components/FlexEvenly";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

const Navigation = ({ step, setStep, serviceProvide, setServiceProvide }) => {
  const theme = useTheme();
  return (
    <WidgetWrapper marginBottom={"1rem"}>
      <Typography
        py={"0.5rem"}
        fontWeight={"bold"}
        fontSize={"1.5rem"}
        color={"primary"}
      >
        Navigation
      </Typography>
      <FlexEvenly>
        <IconButton onClick={() => setStep(step - 1)} disabled={step === 0}>
          <ArrowLeft
            sx={{
              fontSize: "2rem",
              "&:hover": {
                color: theme.palette.primary.dark,
              },
            }}
          />
        </IconButton>
        Step {step}
        <IconButton onClick={() => setStep(step + 1)}>
          <ArrowRight
            sx={{
              fontSize: "2rem",
              "&:hover": {
                color: theme.palette.primary.dark,
              },
            }}
          />
        </IconButton>
      </FlexEvenly>
      {/* <FlexEvenly>
        <Button
          sx={{
            color: theme.palette.primary.dark,
            background: serviceProvide && "#0070fa",
          }}
          onClick={() => setServiceProvide(true)}
        >
          Service Provider
        </Button>
        <Button
          sx={{
            color: theme.palette.primary.dark,
            background: !serviceProvide && "#0070fa",
          }}
          onClick={() => setServiceProvide(false)}
        >
          Want To Book Appointment
        </Button>
      </FlexEvenly> */}
    </WidgetWrapper>
  );
};

export default Navigation;
