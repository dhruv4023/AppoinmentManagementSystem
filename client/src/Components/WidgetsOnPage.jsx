import { Box, useMediaQuery } from "@mui/material";
import React from "react";

const WidgetsOnPage = ({ navbar, leftComponent, rightComponent }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      {navbar}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
          {leftComponent}
          <Box m="1rem 0" />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "60%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {rightComponent}
        </Box>
      </Box>
    </Box>
  );
};

export default WidgetsOnPage;
