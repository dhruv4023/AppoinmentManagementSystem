import WidgetsOnPage from "Components/WidgetsOnPage";
import { Navbar } from "Pages/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditProfileWidget from "Widgets/EditProfileWidget";
import ServiceWidgets from "Widgets/Service/Admin/ServiceWidgets";
import { getAllServices } from "Widgets/Service/Admin/WidgetAdminServiceFun";
import ServiceUserSide from "Widgets/Service/User/ServiceUserSide";
import UserWidgets from "Widgets/UserWidgets";
import { getUser } from "Widgets/WidgetFunctions";

export const ProfilePage = () => {
  const { UID } = useParams();
  const [user, setUser] = useState(null);
  const admin = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    getUser(setUser, UID);
  }, [UID]);

  useEffect(() => {
    const username = user?.username;
    getAllServices(dispatch, username);
  }, [user, dispatch]);

  // console.log(admin?._id === user?._id, user, admin);
  const [editProf, setEditProf] = useState(false);
  // console.log(editProf)
  return (
    <>
      <WidgetsOnPage
        navbar={<Navbar />}
        leftComponent={
          <UserWidgets
            setEditProf={setEditProf}
            user={admin?.username === UID ? admin : user}
            admin={admin?.username === UID}
          />
        }
        rightComponent={
          editProf ? (
            <>
              <EditProfileWidget setEditProf={setEditProf} user={admin} />
            </>
          ) : (
            <>
              {admin?._id === user?._id && user ? (
                <>
                  <ServiceWidgets user={admin} />
                </>
              ) : (
                <>{user && <ServiceUserSide user={user} />}</>
              )}
            </>
          )
        }
      />
    </>
  );
};
{
  /* <Box>
<Navbar />
<Box
  width="100%"
  padding="2rem 6%"
  display={isNonMobileScreens ? "flex" : "block"}
  gap="2rem"
  justifyContent="center"
>
  <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
    
    <Box m="1rem 0" />
  </Box>
  <Box
    flexBasis={isNonMobileScreens ? "60%" : undefined}
    mt={isNonMobileScreens ? undefined : "2rem"}
  >
   
  </Box>
</Box>
</Box> */
}
