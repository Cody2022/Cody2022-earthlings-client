import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function StartEndTimePicker() {
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1} width={"50%"}>
       <TimePicker
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
          renderInput={(params) => <TextField {...params} />}
          />
         <TimePicker
          label="End Time"
          value={endTime}
          onChange={setEndTime}
          renderInput={(params) => <TextField {...params} />}
          />
      </Stack>
    </LocalizationProvider>
  );
}