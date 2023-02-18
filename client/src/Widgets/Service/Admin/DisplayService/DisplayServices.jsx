import React from "react";
import DisplayServiceWidget from "./DisplayServiceWidget";

const DisplayServices = ({ serviceData, CrudServData, setCrudServData }) => {
  return (
    <>
      {serviceData?.map((m) => {
        return (
          <DisplayServiceWidget
            key={m?.SID}
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
