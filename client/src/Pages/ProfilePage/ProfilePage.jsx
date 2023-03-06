import WidgetsOnPage from "Components/WidgetsOnPage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditProfileWidget from "Widgets/EditProfileWidget";
import ServiceWidgets from "Widgets/Service/Admin/ServiceWidgets";
import { getAllServices } from "Widgets/Service/Admin/WidgetAdminServiceFun";
import ServiceUserSide from "Widgets/Service/User/ServiceUserSide";
import UserWidgets from "Widgets/UserWidgets";
import { getUser } from "Widgets/WidgetFunctions";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { UID } = useParams();
  const [user, setUser] = useState(null);
  const admin = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    UID && getUser(setUser, UID, navigate);
  }, [UID]);

  useEffect(() => {
    const username = user?.username;
    username && getAllServices(dispatch, username);
  }, [user, dispatch]);

  const [editProf, setEditProf] = useState(false);
  // console.log(admin?.username === user?.username && user)
  return (
    <>
      <WidgetsOnPage
        leftComponent={
          admin && (
            <UserWidgets
              setEditProf={setEditProf}
              user={admin?.username === UID ? admin : user}
              admin={admin?.username === UID}
            />
          )
        }
        rightComponent={
          editProf ? (
            <>
              <EditProfileWidget setEditProf={setEditProf} user={admin} />
            </>
          ) : (
            <>
              {admin?.username === user?.username && user ? (
                <>
                  <ServiceWidgets user={admin} />
                </>
              ) : (
                <>
                  <ServiceUserSide />
                </>
              )}
            </>
          )
        }
      />
    </>
  );
};
