import React from "react";
import { useSelector } from "react-redux";
import DisplayServiceWidget from "./DisplayServiceWidget";

const DisplayServices = ({ user,serviceData, CrudServData, setCrudServData }) => {

  return (
    <>
      {serviceData?.map((m) => {
        return (
          <DisplayServiceWidget
          key={m?._id}
            servData={m}
            CrudServData={CrudServData}
            setCrudServData={setCrudServData}
          />
        );
      })}
    </>
  );
};

export default DisplayServices;
