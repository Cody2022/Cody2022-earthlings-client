import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function StartEndTimePicker(props) {

  const setTransportInfo=props.setTransportInfo;
  const transportInfo=props.transportInfo;

  const getStartTime=(newTime)=>{
        let hour=newTime.getHours();
        let minute=newTime.getMinutes();
        let second=0;

        let startTime=new Date(transportInfo.date.getFullYear(), transportInfo.date.getMonth(), transportInfo.date.getDate(),hour, minute, second) 
        setTransportInfo({...transportInfo, startTime: startTime})
  }

  const getEndTime=(newTime)=>{
    let hour=newTime.getHours();
    let minute=newTime.getMinutes();
    let second=0;

    let endTime=new Date(transportInfo.date.getFullYear(), transportInfo.date.getMonth(), transportInfo.date.getDate(),hour, minute, second) 
    setTransportInfo({...transportInfo, endTime: endTime})
}
    

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1} width={"50%"}>
       <TimePicker
          label="Start Time"
          value={transportInfo.startTime}
          onChange={getStartTime}
          renderInput={(params) => <TextField {...params} />}
          />
         <TimePicker
          label="End Time"
          value={transportInfo.endTime}
          onChange={getEndTime}
          renderInput={(params) => <TextField {...params} />}
          />
      </Stack>
    </LocalizationProvider>
  );
}