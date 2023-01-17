import {  useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { Navbar } from "Pages/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserWidgets from "Widgets/UserWidgets";
import { getUser } from "Widgets/WidgetFunctions";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    getUser(setUser, userId, token);
    !user && navigate("/", { state: null });
  });
  const { userId } = useParams();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  if (!user) return null;

  // console.log(`${process.env.REACT_APP_SERVER}/${user?.picPath}`)
  return (
    <>
      <Box>
        <Navbar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidgets userId={userId} picturePath={user.picPath} />
            <Box m="2rem 0" />
            {/* <FriendListWidget userId={userId} /> */}
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            {/* <MyPostWidget picturePath={user.picturePath} />
            <Box m="2rem 0" /> */}
            {/* <PostsWidget userId={userId} isProfile /> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};
