import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { multiStepContext } from "./StepContext";
import moment from "moment";
import { Stack } from "react-bootstrap";

const TranslationRequestForm = () => {
  // const { setStep, userData, setUserData } = useContext(multiStepContext);
  const date_create = moment().format("DD-MM-YYYY");
  return (
    <div>
      <div>
        <h3 style={{color: 'blue'}}>Translating Request Form</h3>
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
          id="outlined-basic"
          label="Contact Number"
          variant="outlined"
          margin="normal"
          color="secondary"
        />
      </div>
      <div>
      <TextField
        id="date"
        label="Appointment Request"
        type="date"
        defaultValue={date_create}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </div>
      <Stack component="form" noValidate spacing={3}>
      <div>
      <TextField
        id="time"
        label="Select Start Time"
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
      <TextField
        id="time"
        label="Select End Time"
        type="time"
        defaultValue="12:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
      </div>
      </Stack>
      <div>
        <Button variant="contained" color="primary">
          {" "}
          Next
        </Button>
      </div>
    </div>
  );
};

export default TranslationRequestForm;
