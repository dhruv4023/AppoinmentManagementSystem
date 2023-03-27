import { Box } from "@mui/system";
import Loading from "Components/Loader/Loading";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DisplayServicesWidget from "./DisplayService/DisplayServices";
import ServiceBtnWidget from "./ServiceBtnWidget";
import ServiceFormWidget from "./ServiceFormWidget";

const ServiceWidgets = ({ user }) => {
  const [CrudServData, setCrudServData] = useState({
    openForm: false,
  });
  // const serviceData = null;
  const { serviceData } = useSelector((s) => s.services);
  return (
    <>
      {serviceData ? (
        <Box>
          {user && (
            <ServiceBtnWidget
              user={user}
              setCrudServData={setCrudServData}
              CrudServData={CrudServData}
            />
          )}
          {CrudServData.openForm && (
            <ServiceFormWidget
              CrudServData={CrudServData}
              setCrudServData={setCrudServData}
              user={user}
            />
          )}
          <DisplayServicesWidget
            serviceData={serviceData}
            CrudServData={CrudServData}
            setCrudServData={setCrudServData}
          />
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ServiceWidgets;
