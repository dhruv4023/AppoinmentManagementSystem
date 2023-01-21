import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayServicesWidget from "./DisplayServicesWidget";
import ServiceBtnWidget from "./ServiceBtnWidget";
import ServiceFormWidget from "./ServiceFormWidget";
import { getAllServices } from "./ServiceSubmit";

const ServiceWidgets = ({ user }) => {
  const dispatch = useDispatch();
  const token = useSelector((s) => s.token);
  useEffect(() => {
    const username = user.username;
    getAllServices(token, dispatch, username);
  }, []);
  

  const { serviceData } = useSelector((s) => s.services);

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
        setCrudServData={setCrudServData}
        services={serviceData}
      />
    </Box>
  );
};

export default ServiceWidgets;
