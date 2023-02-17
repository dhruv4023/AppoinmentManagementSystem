import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DisplayServicesWidget from "./DisplayService/DisplayServices";
import ServiceBtnWidget from "./ServiceBtnWidget";
import ServiceFormWidget from "./ServiceFormWidget";

const ServiceWidgets = ({ user }) => {
  const [CrudServData, setCrudServData] = useState({
    openForm: false,
  });

  const { serviceData } = useSelector((s) => s.services);
console.log(serviceData);
  return (
    <Box>
      <ServiceBtnWidget
        user={user}
        setCrudServData={setCrudServData}
        CrudServData={CrudServData}
      />
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
        user={user}
        setCrudServData={setCrudServData}
      />
    </Box>
  );
};

export default ServiceWidgets;
