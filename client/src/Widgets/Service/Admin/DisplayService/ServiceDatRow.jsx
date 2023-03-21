import { useTheme } from "@emotion/react";
import { Box, Divider, Typography } from "@mui/material";
import FlexEvenly from "Components/FlexEvenly";
import React from "react";

const ServiceDatRow = ({ cel1, icon1, cel2, icon2 }) => {
  const theme = useTheme();
  const medium = theme.palette.neutral.medium;
  // const main = theme.palette.neutral.main;
  return (
    <FlexEvenly width={"100%"}>
      <Box p="0.2rem 0" width={"50%"}>
        <Box display={"flex"} alignItems="center" gap="1rem" m={"0.2rem 0"}>
          {icon1}
          <Typography color={medium}>{cel1}</Typography>
        </Box>
      </Box>
      <Box p="0.2rem 0" width={"50%"}>
        <Box display={"flex"} alignItems="center" gap="1rem" m={"0.2rem 0"}>
          {icon2}
          <Typography color={medium}> {cel2}</Typography>
        </Box>
      </Box>
      <Divider />
    </FlexEvenly>
  );
};

export default ServiceDatRow;
