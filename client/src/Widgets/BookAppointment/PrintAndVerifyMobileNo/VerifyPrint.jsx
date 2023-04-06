import { useTheme } from "@emotion/react";
import { Box, Tab, Tabs } from "@mui/material";
import FlexEvenly from "Components/FlexEvenly";
import React, { useState } from "react";
import { a11yProps, TabPanel } from "../TabsPanel";
import PrintPan from "./PrintPan";
import VerifyMobilePan from "./VerifyMobilePan";

const VerifyPrint = ({ appointmentData }) => {
  const theme = useTheme();
  const [tabNo, setTabNo] = useState(0);
  const [aid, setAID] = useState();
  // const handleChange = (e, newValue) => {
  //   e.preventDefault();
  //   setTabNo(newValue);
  // };
  // console.log(aid)
  return (
    <FlexEvenly width={"100%"}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={tabNo}
            aria-label="basic tabs example"
          >
            <Tab label="Verify Mobile No" {...a11yProps(0)} />
            <Tab label="print Receipt" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabNo} index={0} dir={theme.direction}>
          <VerifyMobilePan
            setTabNo={setTabNo}
            setAID={setAID}
            appointmentData={appointmentData}
          />
        </TabPanel>
        <TabPanel value={tabNo} index={1} dir={theme.direction}>
          {aid && <PrintPan aid={aid} details={appointmentData} />}
        </TabPanel>
      </Box>
    </FlexEvenly>
  );
};

export default VerifyPrint;
