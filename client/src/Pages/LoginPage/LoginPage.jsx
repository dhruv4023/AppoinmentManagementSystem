import Form from "./Form";
import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import EmailVerification from "./EmailVerification";
export const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const theme = useTheme();
  const { page } = useParams();
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
        {page === "verifyemail" && <EmailVerification />}
        {!page && <Form />}
      </Box>
    </Box>
  );
};
