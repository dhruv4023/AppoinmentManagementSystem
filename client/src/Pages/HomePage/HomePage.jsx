import WidgetsOnPage from "Components/WidgetsOnPage";
import React, { useState } from "react";
import DisplayFilterData from "Widgets/FilterData/DisplayFilterData";
import FilterWidget from "Widgets/FilterData/FilterWidget";
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
