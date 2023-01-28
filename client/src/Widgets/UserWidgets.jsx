import { useTheme } from "@emotion/react";
import {
  AbcOutlined,
  EditOutlined,
  LocationOnOutlined,
  Twitter,
} from "@mui/icons-material";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FlexBetween from "Components/FlexBetween";
import UserImg from "Components/UserImg";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

const UserWidgets = ({ user, admin, setEditProf }) => {
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const medium = theme.palette.neutral.medium;
  const main = theme.palette.neutral.main;
  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    username,
    about,
    email,
    picPath,
    location,
    impressions,
  } = user;
  return (
    <WidgetWrapper>
      <FlexBetween gap={"1rem"} pb="1.1rem">
        <UserImg image={picPath} />
        <Box flexGrow={"1"}>
          <Typography
            variant="h4"
            color={dark}
            fontWeight={500}
            sx={{
              "&:hover": {
                cursor: "pointer",
                // color: theme.palette.primary.light,
              },
            }}
          >
            {firstName} {lastName}
          </Typography>
          <Typography color={medium}>@{username}</Typography>
        </Box>
        {admin && (
          <IconButton onClick={() => setEditProf(true)}>
            <EditOutlined />
          </IconButton>
        )}
      </FlexBetween>
      <Box margin={"0 1rem"} display={"flex"} alignItems="center">
        <Typography color={medium}>{email}</Typography>
      </Box>
      <Divider />
      <Box p="0.2rem 0">
        <Box display={"flex"} alignItems="center" gap="1rem" m={"0.2rem 0"}>
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>
            {location.city +
              " " +
              location.district +
              " " +
              location.state +
              ", " +
              location.pincode}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box p={"0.2rem 0"}>
        <Box display={"flex"} alignItems="center" gap="1rem" m={"0.2rem 0"}>
          <AbcOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{about}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box p="1rem 0">
        <FlexBetween gap={"0.5rem"}>
          <Typography color={medium}>Impressions of your Profile</Typography>
          <Typography color={main}>{impressions}</Typography>
        </FlexBetween>
      </Box>
      <Divider />
      <Box>
        <Typography fontSize={"1rem"} color={main} fontWeight="500" my="0.7rem">
          Social Profiles
        </Typography>
        <FlexBetween gap={"1rem"} mb="0.5rem">
          <FlexBetween gap={"1rem"}>
            <Twitter />
            <Box>
              <Typography color={main} fontWeight={"500"}>
                Twitter
              </Typography>
              <Typography color={medium} fontWeight={"500"}>
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidgets;
