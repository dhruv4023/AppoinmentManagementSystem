import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayServicesWidget from "../Admin/DisplayService/DisplayServices";
import { getAllServices } from "../Admin/WidgetAdminServiceFun";

const ServiceUserSide = ({ user }) => {
  const dispatch = useDispatch();
  const { serviceData } = useSelector((s) => s.services);
  useEffect(() => {
    const username = user?.username;
    getAllServices(dispatch, username);
  }, []);
  console.log(user);
  return <>{<DisplayServicesWidget serviceData={serviceData} />}</>;
};

export default ServiceUserSide;
