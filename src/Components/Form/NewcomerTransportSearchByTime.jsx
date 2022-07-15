import { Button, Container, Grid, TextField} from '@mui/material';
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const NewcomerTransportSearchByTime = (props) => {
  const transportList=props.transportList;
  const setTransportList=props.setTransportList;

  const { user, isLoading } = useAuth0();
  let email = user.email;

  let today=new Date();
  today=new Date(today.getFullYear(),today.getMonth(), today.getDate(),0,0,0);  //Grab Year, Month, and Day only
  
  const defaultTransportInfo = {
    date: today,
    startTime: new Date().setSeconds(0,0),
    endTime: new Date().setSeconds(0,0),
    languages: [],
    accessories: [],
    maxPassengers: 1,
  };

  const [transportInfo, setTransportInfo] = useState(defaultTransportInfo);

  const getDate = (newDate) => {
    let dayOfMonth = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let localDate = new Date(year, month, dayOfMonth);
    setTransportInfo({ ...transportInfo, date: localDate });
  };

  const getStartTime = (newTime) => {
    let hour = newTime.getHours();
    let minute = newTime.getMinutes();
    let second = 0;

    let startTime = new Date(
      transportInfo.date.getFullYear(),
      transportInfo.date.getMonth(),
      transportInfo.date.getDate(),
      hour,
      minute,
      second
    );
    setTransportInfo({ ...transportInfo, startTime: startTime });
  };

  /* Search by startTime*/
  const searchByStartTime = async (transportInfo) => {
    const response = await fetch(`/transport/getbystarttime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transportInfo),
    });
    return response.json();
  };

  const handleSearchByTime = async (event) => {
    event.preventDefault();
    try {
      const foundTransportList = await searchByStartTime(transportInfo);
      console.log(foundTransportList)
      setTransportList(foundTransportList)
     } catch (error) {
      console.log("Error in finding Transport Form", error.message);
    }
  };

  /* Get all transport listings of a volunteer with email*/
  const getTransportListByEmail = async (email) => {
    let response = await fetch(`/transport/get/${email}`);
    let transportInfo = await response.json();
    return transportInfo;
  };

  /* Get all transport listings*/
  const getAllTransportListings = async () => {
    let response = await fetch(`/transport/getall`);
    let allTransportListings = await response.json();
    return allTransportListings;
  };

  const handleGetAll = async (event) => {
    event.preventDefault();
    const foundTransportInfo = await getAllTransportListings();
    console.log("View All", foundTransportInfo)
  };

  return (
     <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
        sx={{ width: "100%", marginTop: 2, marginBottom: 5 }}
      >
        <Grid item marginBottom={1}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={transportInfo.date}
              minDate={new Date("2018-01-01")}
              onChange={getDate}
              renderInput={(params) => (
                <TextField {...params}  />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item marginBottom={1}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={1} >
              <TimePicker
                label="Time"
                value={transportInfo.startTime}
                onChange={getStartTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Grid>
        <Grid item display={"flex"} justifyContent={"flex-start"}>
          <Button
            sx={{ my: 2, textTransform: 'capitalize' }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSearchByTime}
          >
            Search by Date and Time
          </Button>     
        </Grid>
      </Grid>
  );
};

export default NewcomerTransportSearchByTime