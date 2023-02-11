import { AddOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

const ServiceBtnWidget = ({ setCrudServData, CrudServData, user }) => {
  const initialServiceData = {
    category: "",
    serviceName: "",
    serviceStartTime: "",
    serviceEndTime: "",
    breakStartTime: "",
    breakEndTime: "",
    appoinmentTime: "",
    description: "",
    username: user.username,
    location: user.location,
  };
  console.log(initialServiceData)
  return (
    <WidgetWrapper m={"0 0 .5rem 0"}>
      <Button
        disabled={CrudServData.openForm}
        color={"primary"}
        onClick={() =>
          setCrudServData({
            openForm: true,
            data: initialServiceData,
          })
        }
      >
        <AddOutlined />
        <Typography>Create New Service</Typography>
      </Button>
    </WidgetWrapper>
  );
};

export default ServiceBtnWidget;
