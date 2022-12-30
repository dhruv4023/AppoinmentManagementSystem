import Form from "./Form";
import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;

  return (
    <Box>
      <Box
        width={"100%"}
        p={"1rem 6%"}
        textAlign="center"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight={"bold"} fontSize="32px" color={"primary"}>
          Sociopedia
        </Typography>
      </Box>
      <Box
        p="2rem"
        m={"2rem auto"}
        border="2px solid"
        borderRadius={"1.5rem"}
        width={isNonMobileScreens ? "40%" : "90%"}
      >
        <Typography fontWeight={"500"} variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Sociopedia, the Social media for Sociopaths !
        </Typography>
        <Form></Form>
      </Box>
    </Box>
  );
};
