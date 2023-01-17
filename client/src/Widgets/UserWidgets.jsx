import { useTheme } from "@emotion/react";
import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FlexBetween from "Components/FlexBetween";
import UserImg from "Components/UserImg";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getUser } from "./WidgetFunctions";

const UserWidgets = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const theme = useTheme();
  // console.log(palette)
  // console.log(picturePath);
  // const navigate = useNavigate();
  const token = useSelector((s) => s.token);
  const dark = theme.palette.neutral.dark;
  const medium = theme.palette.neutral.medium;
  const main = theme.palette.neutral.main;
  useEffect(() => {
    getUser(setUser, userId, token);
  }, []);
  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    picPath,
    friends,
    location,
    occupation,
    viewedProfile,
    impressions,
  } = user;
  return (
    <WidgetWrapper>
      <FlexBetween gap={"1rem"} pb="1.1rem">
        <UserImg image={picPath} />
        <Box>
          <Typography
            variant="h4"
            color={dark}
            fontWeight={500}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.light,
              },
            }}
          >
            {firstName} {lastName}
          </Typography>
          <Typography color={medium}>{friends?.length} Friends</Typography>
        </Box>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
      <Box p="1rem 0">
        <Box display={"flex"} alignItems="center" gap="1rem" mb={"0.5rem"}>
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display={"flex"} alignItems="center" gap="1rem" mb={"0.5rem"}>
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box p="1rem 0">
        <FlexBetween gap={"0.5rem"}>
          <Typography color={medium}>who's viewed your profile</Typography>
          <Typography color={main}>{viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween gap={"0.5rem"}>
          <Typography color={medium}>Impressions of your Profile</Typography>
          <Typography color={main}>{impressions}</Typography>
        </FlexBetween>
      </Box>
      <Divider />
      <Box>
        <Typography fontSize={"1rem"} color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap={"1rem"} mb="0.5rem">
          <FlexBetween gap={"1rem"}>
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight={"500"}>
                Twitter
              </Typography>
              <Typography color={medium} fontWeight={"500"}>
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined />
        </FlexBetween>
        <FlexBetween gap={"1rem"} mb="0.5rem">
          <FlexBetween gap={"1rem"}>
            <img src="../assets/linkedin.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight={"500"}>
                LinkedIn
              </Typography>
              <Typography color={medium} fontWeight={"500"}>
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidgets;
