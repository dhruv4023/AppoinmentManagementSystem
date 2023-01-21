import { Box } from "@mui/system";
import React, { useState } from "react";
import DisplayServicesWidget from "./DisplayServicesWidget";
import ServiceBtnWidget from "./ServiceBtnWidget";
import ServiceFormWidget from "./ServiceFormWidget";

const ServiceWidgets = ({ user }) => {
  const [CrudServData, setCrudServData] = useState({
    openForm: false,
  });
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
        CrudServData={CrudServData}
        user={user}
        setCrudServData={setCrudServData}
      />
    </Box>
  );
};

export default ServiceWidgets;
