import { Button, Container, Grid, TextField} from '@mui/material';
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

//This
const TranslateFilterDate = (props) => {
  const translateList=props.translateList;
  const setTranslateList=props.setTranslateList;

  const { user, isLoading } = useAuth0();
  let email = user.email;

  let today=new Date();
  today=new Date(today.getFullYear(),today.getMonth(), today.getDate(),0,0,0);  //Grab Year, Month, and Day only
  
  const defaultTranslateInfo = {
    date: today,
    startTime: new Date().setSeconds(0, 0),
    endTime: new Date().setSeconds(0, 0),
    fromlanguage: [],
    tolanguage: [],
  };

  const [translateInfo, setTranslateInfo] = useState(defaultTranslateInfo);

  const getDate = (newDate) => {
    let dayOfMonth = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let localDate = new Date(year, month, dayOfMonth);
    setTranslateInfo({ ...translateInfo, date: localDate });
  };

  const getStartTime = (newTime) => {
    let hour = newTime.getHours();
    let minute = newTime.getMinutes();
    let second = 0;

    let startTime = new Date(
      translateInfo.date.getFullYear(),
      translateInfo.date.getMonth(),
      translateInfo.date.getDate(),
      hour,
      minute,
      second
    );
    setTranslateInfo({ ...translateInfo, startTime: startTime });
  };

  /* Search by startTime*/
  const searchByStartTime = async (translateInfo) => {
    const response = await fetch(`/transport/getbystarttime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(translateInfo),
    });
    return response.json();
  };

  const handleSearchByTime = async (event) => {
    event.preventDefault();
    try {
      const foundTransportList = await searchByStartTime(translateInfo);
      console.log(foundTransportList)
      setTranslateList(foundTransportList)
     } catch (error) {
      console.log("Error in finding Transport Form", error.message);
    }
  };

  /* Get all translate listings of a volunteer with email*/
  const getTranslateListByEmail = async (email) => {
    let response = await fetch(`/translate/get/${email}`);
    let translateInfo = await response.json();
    return translateInfo;
  };

  /* Get all translate listings*/
  const getAllTranslateListings = async () => {
    let response = await fetch(`/translate/getall`);
    let allTransportListings = await response.json();
    return allTransportListings;
  };

  const handleGetAll = async (event) => {
    event.preventDefault();
    const foundTranslateInfo = await getAllTranslateListings();
    console.log("View All", foundTranslateInfo)
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
              value={translateInfo.date}
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
                value={translateInfo.startTime}
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

export default TranslateFilterDate