import { Box } from "@mui/system";
import WidgetWrapper from "Components/WidgetWrapper";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PrintData from "./PrintData";

const PrintPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const apDt = location.state;
  useEffect(() => {
    apDt && window.print();
    apDt
      ? navigate(`/printreceipt/${location.state.AID}`)
      : navigate("/printreceipt");
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        zIndex: "5",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        color: "black",
        padding: "2rem",
        background: "white",
      }}
    >
      {apDt && (
        <WidgetWrapper
          sx={{
            color: "black",
            background: "white",
          }}
        >
          <PrintData data={apDt} />
        </WidgetWrapper>
      )}
    </Box>
  );
};

export default PrintPreview;
