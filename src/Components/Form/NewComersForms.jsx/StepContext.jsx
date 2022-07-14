import React, { useState } from "react";
import TranslationSubmit from "./TranslationSubmit";

export const multiStepContext = React.createContext();
const StepContext = () => {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [finalData, setFinalData] = useState([]);

  return (
    <div>
      <multiStepContext.Provider
        value={{
          currentStep,
          setStep,
          userData,
          setUserData,
          finalData,
          setFinalData,
        }}
      >
        <TranslationSubmit />
      </multiStepContext.Provider>
    </div>
  );
};

export default StepContext;
