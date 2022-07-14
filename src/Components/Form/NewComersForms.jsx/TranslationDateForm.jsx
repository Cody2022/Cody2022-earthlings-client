import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { multiStepContext } from "./StepContext";

const TranslationDateForm = () => {
  // const { setStep, userData, setUserData } = useContext(multiStepContext);
  return (
    <div>
      <div>
        <h3 style={{color: 'blue'}}>Translating Date Form</h3>
        <TextField
          id="outlined-basic"
          label="First name"
          variant="outlined"
          margin="normal"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Last name"
          variant="outlined"
          margin="normal"
          color="secondary"
        />
      </div>
      <div>
      <TextField
        id="time"
        label="Alarm clock"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
      </div>
      <div>
        <Button variant="contained" color="primary">
          {" "}
          Next
        </Button>
      </div>
    </div>
  );
};

export default TranslationDateForm;
