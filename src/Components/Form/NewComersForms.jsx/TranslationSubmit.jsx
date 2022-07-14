import React, { useContext } from "react";
import { Stepper, StepLabel, Step, Box } from "@mui/material";
import TranslationRequestForm from "./TranslationRequestForm";
import TranslationTypeForm from "./TranslationTypeForm";
import TranslationDateForm from "./TranslationDateForm";
// import { multiStepContext } from "./StepContext";

const steps = ["Translation Request", "Type", "Date"];

function TranslationSubmit() {
  //   const { currentStep, finalData } = useContext(multiStepContext);
  function showStep(step) {
    switch (step) {
      case 1:
        return <TranslationRequestForm />;
      case 2:
        return <TranslationTypeForm />;
      case 3:
        return <TranslationDateForm />;
    }
  }

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {showStep(1)}
    </div>
  );
}

export default TranslationSubmit;
