import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import WidgetsOnPage from "Components/WidgetsOnPage";
import FilterWidget from "Widgets/FilterWidget";
import DisplayFilterData from "Widgets/FilterData/DisplayFilterData";
const HomePage = () => {
  const [filteredData, setFilteredData] = useState("");
  return (
    <>
      <WidgetsOnPage
        title={"All Appointments Category"}
        leftComponent={<FilterWidget setFilteredData={setFilteredData} />}
        rightComponent={<DisplayFilterData filteredData={filteredData} />}
      />
    </>
  );
};

export default HomePage;
