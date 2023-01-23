import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DashBoardAndUserView = () => {
  const admin = useSelector((state) => state.user);
  const { UID, SID } = useParams();
  return <div>hello</div>;
};

export default DashBoardAndUserView;
