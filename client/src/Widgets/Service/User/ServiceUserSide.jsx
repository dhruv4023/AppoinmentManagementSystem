import React from "react";
import {  useSelector } from "react-redux";
import DisplayServicesWidget from "../Admin/DisplayService/DisplayServices";

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
