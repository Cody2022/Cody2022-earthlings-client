import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function ResponsiveDatePickers(props) {
  const setTransportInfo=props.setTransportInfo;
  const transportInfo=props.transportInfo;

  const getDate=(newDate)=>{
      let dayOfMonth=newDate.getDate();
      let month=newDate.getMonth();
      let year=newDate.getFullYear();
      let localDate=new Date (year, month, dayOfMonth);
      setTransportInfo({...transportInfo, date:localDate})
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
       <DatePicker
          label="Date"
          value={transportInfo.date}
          minDate={new Date('2018-01-01')}
          onChange={getDate}
          renderInput={(params) => <TextField {...params} sx={{width:"50%"}}/>}
        />
    </LocalizationProvider>
  );
}
