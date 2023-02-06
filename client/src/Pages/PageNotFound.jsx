import FlexBetween from "Components/FlexBetween";
import React from "react";
import { useLocation } from "react-router-dom";

const PageNotFound = () => {
  const location = useLocation();
  // const msg=location.state ? location.state :
  return <FlexBetween>{location.state} PageNotFound</FlexBetween>;
};

export default PageNotFound;
