import { useTheme } from "@emotion/react";
import { ArrowBack, ArrowForward, PushPin } from "@mui/icons-material";
import { Button, Divider, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FlexBetween from "Components/FlexBetween";
import FlexEvenly from "Components/FlexEvenly";
import React, { useState } from "react";
// import SwipeableViews from "react-swipeable-views";
import Confirmation from "./Confirmation";
import FillDetail from "./FillDetail";
import SelectDateTime from "./SelectDateTime";
import { a11yProps, TabPanel } from "./TabsPanel";

const BookAppointMentWidget = ({ servData }) => {
  const theme = useTheme();
  const [tabNo, setTabNo] = useState(0);

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setTabNo(newValue);
  };

  const [dateAndTime, setDateAndTime] = useState();
  const [Details, setDetails] = useState();
  // console.log(servData);
  return (
    <FlexBetween flexDirection={"column"}>
      <Typography
        component={"span"}
        gap={"0.5rem"}
        width={"100%"}
        color={"primary"}
        variant="h3"
      >
        <PushPin />
        Book Your Appoinment
      </Typography>
      <FlexEvenly width={"100%"}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={tabNo}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Date And Time" {...a11yProps(0)} />
              <Tab label="Your Details" {...a11yProps(1)} />
              <Tab
                disabled={!Details || !dateAndTime}
                label="Conformation"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          {/* <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={tabNo}
            onChangeIndex={handleChange}
          > */}
            <TabPanel value={tabNo} index={1} dir={theme.direction}>
              <FillDetail
                setTabNo={setTabNo}
                details={Details}
                dateAndTime={dateAndTime}
                setDetails={setDetails}
              />
            </TabPanel>
            <TabPanel value={tabNo} index={0} dir={theme.direction}>
              <SelectDateTime
                servData={servData}
                dateAndTime={dateAndTime}
                setDateAndTime={setDateAndTime}
              />
            </TabPanel>
            <TabPanel value={tabNo} index={2} dir={theme.direction}>
              <Confirmation servData={servData} Details={{ ...Details, ...dateAndTime }} />
            </TabPanel>
          {/* </SwipeableViews> */}
          <Divider />
          <FlexEvenly>
            <Button disabled={tabNo === 0} onClick={() => setTabNo(tabNo - 1)}>
              <ArrowBack />
            </Button>
            <Button disabled={tabNo === 0} onClick={() => setTabNo(0)}>
              1
            </Button>
            <Button disabled={tabNo === 1} onClick={() => setTabNo(1)}>
              2
            </Button>
            <Button
              disabled={tabNo === 2 || !dateAndTime || !Details}
              onClick={() => setTabNo(2)}
            >
              3
            </Button>
            <Button
              disabled={
                tabNo === 2 || ((!dateAndTime || !Details) && tabNo === 1)
              }
            >
              <ArrowForward onClick={() => setTabNo(Math.abs(tabNo + 1))} />
            </Button>
          </FlexEvenly>
        </Box>
      </FlexEvenly>
    </FlexBetween>
  );
};

export default BookAppointMentWidget;
