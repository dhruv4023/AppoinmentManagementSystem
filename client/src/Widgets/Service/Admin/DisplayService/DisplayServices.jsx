import React from "react";
import { useSelector } from "react-redux";
import DisplayServiceWidget from "./DisplayServiceWidget";

const DisplayService = ({ user, CrudServData, setCrudServData }) => {

  const { serviceData } = useSelector((s) => s.services);

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

export default DisplayService;
