import { QrCode2Outlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";
import QRCode from "react-qr-code";

const QRWidget = ({ sz = 256, link, description }) => {
  // console.log(link)
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
        {description}
      </Typography>
      <Box
        p={"0.5rem"}
        sx={{ background: "white", width: "fit-content" }}
        m={"auto"}
      >
        <QRCode
          size={sz}
          style={{ maxWidth: "100%", width: "100%" }}
          value={`${process.env.REACT_APP_QR_SRC_LINK}/${link}`}
          viewBox={`0 0 256 256`}
        />
      </Box>
    </WidgetWrapper>
  );
};

export default QRWidget;
