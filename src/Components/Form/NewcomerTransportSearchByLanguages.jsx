import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid } from '@mui/material';
import React, { useState } from 'react'

const NewcomerTransportSearchByLanguages = (props) => {
    const setTransportList=props.setTransportList;

    let today = new Date();
    today = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0
    ); //Grab Year, Month, and Day only

    const defaultTransportInfo = {
      date: today,
      startTime: new Date().setSeconds(0, 0),
      endTime: new Date().setSeconds(0, 0),
      languages: [],
      accessories: [],
      maxPassengers: 1,
    };

  const [transportInfo, setTransportInfo] = useState(defaultTransportInfo);


  const getLanguages = (e) => {
    const { value, checked } = e.target;
    const { languages } = transportInfo;
    // Case 1 : The user checks the box
    if (checked) {
      setTransportInfo({ ...transportInfo, languages: [...languages, value] });
    }
    // Case 2  : The user unchecks the box
    else {
      setTransportInfo({
        ...transportInfo,
        languages: languages.filter((e) => e !== value),
      });
    }
  };

    /* Search by Languages*/
    const searchByLanguages = async (transportInfo) => {
        const response = await fetch(`/transport/getbylanguages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transportInfo),
        });
        return response.json();
    };

    const handleSearchByLanguages = async (event) => {
        event.preventDefault();
        try {
        const foundTransportList = await searchByLanguages(transportInfo);
        console.log("foundTransportList is",foundTransportList);
        setTransportList(foundTransportList);
        } catch (error) {
        console.log("Error in creating Transport Form", error.message);
        }
    };

  return (
    <Grid container style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <Grid item>
        <FormGroup row sx={{ py: 1 }}>
          <FormLabel
            sx={{ py: 2, px: 2, fontWeight: "bold", color: "black" }}
            id="demo-row-radio-buttons-group-label"
          >
            Language
          </FormLabel>

          <FormControlLabel
            control={
              <Checkbox checked={transportInfo.languages.includes("English")} />
            }
            name="languages"
            label="English"
            value="English"
            onChange={getLanguages}
          />
          <FormControlLabel
            control={
              <Checkbox checked={transportInfo.languages.includes("French")} />
            }
            name="languages"
            value="French"
            label="French"
            onChange={getLanguages}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={transportInfo.languages.includes("Ukrainian")}
              />
            }
            name="languages"
            value="Ukrainian"
            label="Ukrainian"
            onChange={getLanguages}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={transportInfo.languages.includes("Mandarin")}
              />
            }
            name="languages"
            value="Mandarin"
            label="Mandarin"
            onChange={getLanguages}
          />
          <FormControlLabel
            control={
              <Checkbox checked={transportInfo.languages.includes("Somali")} />
            }
            name="languages"
            value="Somali"
            label="Somali"
            onChange={getLanguages}
          />
          <FormControlLabel
            control={
              <Checkbox checked={transportInfo.languages.includes("Other")} />
            }
            name="languages"
            value="Other"
            label="Other"
            onChange={getLanguages}
          />
        </FormGroup>
      </Grid>
      <Grid item marginBottom={3} display="flex" justifyContent="center">
        <Button
          sx={{textTransform: "capitalize",  }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSearchByLanguages}
        >
          Search by Languages
        </Button>
      </Grid>
    </Grid>
  );
}

export default NewcomerTransportSearchByLanguages