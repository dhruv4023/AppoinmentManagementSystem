import { QrCode, QrCode2Outlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";
import QRCode from "react-qr-code";

const QRWidget = ({ link }) => {
  return (
    <WidgetWrapper mt={"1rem"}>
      <Typography
        component={"span"}
        gap={"0.5rem"}
        width={"100%"}
        color={"primary"}
        variant="h5"
      >
        <QrCode2Outlined />
        Scan QR To Open Book Appointment Form
      </Typography>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={`${process.env.REACT_APP_QR_SRC_LINK}/${link}`}
        viewBox={`0 0 256 256`}
      />
    </WidgetWrapper>
  );
};

export default QRWidget;
