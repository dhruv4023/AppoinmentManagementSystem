import React from "react";
import { useTheme } from "@emotion/react";
import WidgetsOnPage from "Components/WidgetsOnPage";
import FilterWidget from "Widgets/FilterWidget";
const HomePage = () => {
  const theme = useTheme();
  return (
    <>
      <WidgetsOnPage
        title={"All Appointments Category"}
        leftComponent={<FilterWidget />}
      />
    </>
  );
};

export default HomePage;
