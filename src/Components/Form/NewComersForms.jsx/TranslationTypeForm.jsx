import React from "react";
import { Button, TextField } from "@mui/material";

const TranslationTypeForm = () => {
  return (
    <div>
      <div>
        <TextField
          id="outlined-basic"
          label="TYPE"
          variant="outlined"
          margin="normal"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="CHAT"
          variant="outlined"
          margin="normal"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="THIS"
          variant="outlined"
          margin="normal"
          color="secondary"
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

export default TranslationTypeForm;
