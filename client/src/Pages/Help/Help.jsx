import WidgetsOnPage from "Components/WidgetsOnPage";
import React from "react";
import AuthHelp from "./Widgets/AuthHelp";

const Help = () => {
  return <WidgetsOnPage title={"Help"} rightComponent={<AuthHelp />} />;
};

export default Help;
