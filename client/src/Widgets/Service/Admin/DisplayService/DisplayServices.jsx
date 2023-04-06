import React from "react";
import DisplayServiceWidget from "./DisplayServiceWidget";

const DisplayServices = ({ serviceData, CrudServData, setCrudServData }) => {
  console.log(serviceData)
  return (
    <>
      {serviceData?.map((m) => {
        return (
          <DisplayServiceWidget
            key={m?.sid}
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
