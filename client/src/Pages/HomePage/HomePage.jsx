import WidgetsOnPage from "Components/WidgetsOnPage";
import React, { useState } from "react";
import DisplayFilterData from "Pages/HomePage/Widgets/DisplayFilterData";
import FilterWidget from "Pages/HomePage/Widgets/FilterWidget";
const HomePage = () => {
  const [filteredData, setFilteredData] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <WidgetsOnPage
        title={"All Appointments Category"}
        leftComponent={
          <FilterWidget
            loading={loading}
            setLoading={setLoading}
            setFilteredData={setFilteredData}
          />
        }
        rightComponent={
          <DisplayFilterData loading={loading} filteredData={filteredData} />
        }
      />
    </>
  );
};

export default HomePage;
