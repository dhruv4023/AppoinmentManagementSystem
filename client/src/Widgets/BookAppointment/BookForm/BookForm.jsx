import { useTheme } from "@emotion/react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, Divider, Tab, Tabs } from "@mui/material";
import FlexEvenly from "Components/FlexEvenly";
import React, { useState } from "react";
import Confirmation from "./Confirmation";
import FillDetail from "./FillDetail";
import SelectDateTime from "./SelectDateTime";
import { a11yProps, TabPanel } from "../TabsPanel";

const BookForm = ({ servData, setAppointmentData }) => {
  const theme = useTheme();
  const [tabNo, setTabNo] = useState(0);

  const handleChange = (e, newValue) => {
    e.preventDefault();
    setTabNo(newValue);
  };

  const [dateAndTime, setDateAndTime] = useState();
  const [details, setDetails] = useState();
  return (
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
              disabled={!details || !dateAndTime}
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
            details={details}
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
          <Confirmation
            setAppointmentData={setAppointmentData}
            servData={servData}
            details={{ ...details, ...dateAndTime }}
          />
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
            // disabled={tabNo === 2 || !dateAndTime || !details}
            onClick={() => setTabNo(2)}
          >
            3
          </Button>
          <Button
            disabled={
              tabNo === 2 || ((!dateAndTime || !details) && tabNo === 1)
            }
          >
            <ArrowForward onClick={() => setTabNo(Math.abs(tabNo + 1))} />
          </Button>
        </FlexEvenly>
      </Box>
    </FlexEvenly>
  );
};

export default BookForm;
