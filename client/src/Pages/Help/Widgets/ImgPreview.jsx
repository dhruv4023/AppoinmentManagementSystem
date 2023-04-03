import WidgetWrapper from "Components/WidgetWrapper";
import React from "react";

const ImgPreview = ({ img }) => {
  return (
    <WidgetWrapper marginBottom={"1rem"}>
      <img src={img} style={{ width: "100%" }} />
    </WidgetWrapper>
  );
};

export default ImgPreview;
