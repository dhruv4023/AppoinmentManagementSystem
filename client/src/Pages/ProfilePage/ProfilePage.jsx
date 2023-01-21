import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { Navbar } from "Pages/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ServiceWidgets from "Widgets/Service/Admin/ServiceWidgets";
import ServiceUserSide from "Widgets/Service/User/ServiceUserSide";
import UserWidgets from "Widgets/UserWidgets";
import { getUser } from "Widgets/WidgetFunctions";

export const ProfilePage = () => {
  const { UID } = useParams();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const admin = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  useEffect(() => {
    getUser(setUser, UID, token);
  }, []);

  // console.log(user, admin);
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
          <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
            <UserWidgets UID={UID} user={admin ? admin : user} />
            <Box m="1rem 0" />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "60%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            {admin?._id === user?._id ? (
              <ServiceWidgets user={admin} />
            ) : (
              <>
                <ServiceUserSide user={user} />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
