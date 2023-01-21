import { useTheme } from "@emotion/react";
import {
  Description,
  Edit,
  EditOutlined,
  LocationOnOutlined,
  Timelapse,
  WorkOutline,
} from "@mui/icons-material";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FlexBetween from "Components/FlexBetween";
import FlexEvenly from "Components/FlexEvenly";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

const DisplayServicesWidget = ({ services, CrudServData, setCrudServData }) => {
  // console.log(services.category)
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const medium = theme.palette.neutral.medium;
  const main = theme.palette.neutral.main;
  return (
    <>
      {services?.map((m) => {
        return (
          <WidgetWrapper key={m?._id} m={"0.5rem 0 0  0"}>
            <FlexBetween flexDirection={"column"}>
              <FlexBetween width={"100%"}>
                <Typography flexGrow={1} color={"primary"} variant="h3">
                  {m?.category}
                </Typography>
                <IconButton
                  disabled={CrudServData.openForm}
                  onClick={() => {
                    setCrudServData({
                      openForm: true,
                      data: m,
                    });
                  }}
                >
                  <EditOutlined />
                </IconButton>
              </FlexBetween>
              <FlexBetween width={"100%"}>
                <FlexBetween flexDirection={"column"} width={"50%"}>
                  <Box p="0.2rem 0" width={"100%"}>
                    <Box p="0.2rem 0" width={"100%"}>
                      <Box
                        display={"flex"}
                        alignItems="center"
                        gap="1rem"
                        m={"0.2rem 0"}
                      >
                        <WorkOutline fontSize="large" sx={{ color: main }} />
                        <Typography color={medium}>{m?.category}</Typography>
                      </Box>
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems="center"
                      gap="1rem"
                      m={"0.2rem 0"}
                    >
                      <Description fontSize="large" sx={{ color: main }} />
                      <Typography color={medium}> {m?.description}</Typography>
                    </Box>
                  </Box>
                  <Divider />
                </FlexBetween>
                <FlexBetween flexDirection={"column"} width={"50%"}>
                  <Box p="0.2rem 0" width={"100%"}>
                    <Box
                      display={"flex"}
                      alignItems="center"
                      gap="1rem"
                      m={"0.2rem 0"}
                    >
                      <Timelapse fontSize="large" sx={{ color: main }} />
                      <Typography color={medium}>{m?.timeRange}</Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Box p="0.2rem 0" width={"100%"}>
                    <Box
                      display={"flex"}
                      alignItems="center"
                      gap="1rem"
                      m={"0.2rem 0"}
                    >
                      <LocationOnOutlined
                        fontSize="large"
                        sx={{ color: main }}
                      />
                      <Typography color={medium}>
                        {m.location.city +
                          " " +
                          m.location.district +
                          " " +
                          m.location.state +
                          ", " +
                          m.location.pincode}
                      </Typography>
                    </Box>
                  </Box>
                </FlexBetween>
              </FlexBetween>
            </FlexBetween>
          </WidgetWrapper>
        );
      })}
    </>
  );
};

export default DisplayServicesWidget;
