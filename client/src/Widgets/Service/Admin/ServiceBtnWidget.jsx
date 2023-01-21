import {
  AddOutlined,
  CreateOutlined,
  PlusOneOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

const ServiceBtnWidget = ({ setCrudServData, CrudServData, user }) => {
  const initialServiceData = {
    category: "",
    timeRange: "",
    description: "",
    username: user.username,
    location: {
      state: user.location.state,
      district: user.location.district,
      city: user.location.city,
      pincode: user.location.pincode,
    },
  };
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
