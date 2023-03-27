import { Bookmark } from "@mui/icons-material";
import { Typography } from "@mui/material";
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
      <DisplayDataComp ky={"AID"} value={data.AID} />
      <DisplayDataComp
        ky={"STATUS"}
        value={
          data.status === 0
            ? "PENDING"
            : data.status === 1
            ? "SUCCESS"
            : data.status === -1 && "CANCELED"
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
        link={`printreceipt/${data.AID}`}
      />
    </>
  );
};

export default PrintData;