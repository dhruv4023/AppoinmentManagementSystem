import WidgetsOnPage from "Components/WidgetsOnPage";
import React from "react";
import AppointmentNo from "Pages/PrintAndVerifyAppointment/Widget/AppointmentNo";
import PrintAndView from "Pages/PrintAndVerifyAppointment/Widget/PrintAndView";

const PrintAndVerifyAppointment = () => {
    
  return (
    <WidgetsOnPage
      leftComponent={<AppointmentNo />}
      rightComponent={<PrintAndView />}
    />
  );
};

export default PrintAndVerifyAppointment;
