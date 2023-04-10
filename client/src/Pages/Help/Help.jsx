import WidgetsOnPage from "Components/WidgetsOnPage";
import React, { useEffect, useState } from "react";
import ImgPreview from "./Widgets/ImgPreview";
import Navigation from "./Widgets/Navigation";
import Instruction from "./Widgets/Instruction";

const Help = () => {
  const [stepData, setStepData] = useState();
  // const [serviceProvide, setServiceProvide] = useState(true);
  const [step, setStep] = useState(0);
  const getHelpdata = async () => {
    fetch("/helpData/help.json")
      .then((response) => response.json())
      .then((data) => {
        setStepData(data.find((item) => item.step === step));
      });
  };
  useEffect(() => {
    getHelpdata();
  }, [step]);
  // console.log(stepData);
  return (
    <WidgetsOnPage
      title={"Help"}
      leftComponent={
        <Navigation
          step={step}
          setStep={setStep}
          // serviceProvide={serviceProvide}
          // setServiceProvide={setServiceProvide}
        />
      }
      rightComponent={
        <>
          {stepData ? (
            <>
              <Instruction step={step} instruction={stepData.instruction} />
              <ImgPreview img={stepData.imgpath} />
            </>
          ) : (
            <>No Step Available</>
          )}
        </>
      }
    />
  );
};

export default Help;
