import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayServicesWidget from "../Admin/DisplayService/DisplayServices";
import { getAllServices } from "../Admin/WidgetAdminServiceFun";

const ServiceUserSide = () => {
  const { serviceData } = useSelector((s) => s.services);
  // useEffect(() => {
  //   const username = user?.username;
  //   getAllServices(dispatch, username);
  // }, []);
  // console.log(serviceData);
  return (
    <>{serviceData && <DisplayServicesWidget serviceData={serviceData} />}</>
  );
};

export default ServiceUserSide;
