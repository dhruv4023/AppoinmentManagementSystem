import { Bookmark } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { DisplayDataComp } from "Components/MyComponents";
import React from "react";
import { DDMMYYYY } from "state/globalFunctions";
import QRWidget from "Widgets/QRWidget";

const PrintData = ({ data }) => {
  // console.log(data);
  return (
    <>
      <Typography
        fontSize={"1.5rem"}
        color={"primary"}
        fontWeight="500"
        width={"100%"}
      >
        <Bookmark /> Your Appointment Receipt
      </Typography>
      <DisplayDataComp ky={"aid"} value={data.aid} />
      <DisplayDataComp
        ky={"STATUS"}
        value={
          data.status === 0
            ? <i style={{ color: "green" }}>PENDING</i>
            : data.status === 1
            ? "SUCCESS"
            : data.status === -1 && <i style={{ color: "red" }}>"CANCELLED"</i>
        }
      />
      <DisplayDataComp ky={"NAME"} value={data.name} />
      <DisplayDataComp ky={"CONTACT NUMBER"} value={data.contactNumber} />
      <DisplayDataComp ky={"EMAIL"} value={data.email} />
      <DisplayDataComp ky={"MESSAGE"} value={data.message} />
      <DisplayDataComp ky={"TIME"} value={data.dateTime.time} />
      <DisplayDataComp ky={"DATE"} value={DDMMYYYY(data.dateTime.date)} />
      <QRWidget
        description={"Scan QR To Open Your Appointment Data"}
        link={`printreceipt/${data.aid}`}
      />
    </>
  );
};

export default PrintData;
