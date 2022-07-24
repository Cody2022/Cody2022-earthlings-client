import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ServerRequestDatePicker from "./ServerRequestDatePicker";
import StartEndTimePicker from "./StartEndTimePicker";
import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "react-bootstrap";

const VolunTransportForm = (props) => {
  const rerender = props.rerender;
  const setRerender = props.setRerender;
  const { user, isLoading } = useAuth0();
  let email = user.email;

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
    email: email,
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

  const getAccessories = (e) => {
    const { value, checked } = e.target;
    const { accessories } = transportInfo;
    // Case 1 : The user checks the box
    if (checked) {
      setTransportInfo({
        ...transportInfo,
        accessories: [...accessories, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setTransportInfo({
        ...transportInfo,
        accessories: accessories.filter((e) => e !== value),
      });
    }
  };

  const createTransportInfo = async (transportInfo) => {
    const response = await fetch(`/transport/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transportInfo),
    });
    return response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newTransportInfo = await createTransportInfo(transportInfo);
      setRerender(!rerender);
    } catch {
      console.log("Error in creating Transport Form");
    }
  };

  /* Get all transport listings of a volunteer with email*/
  const getTransportInfo = async (email) => {
    let response = await fetch(`/transport/get/${email}`);
    let transportInfo = await response.json();
    return transportInfo;
  };

  const deleteTransportInfo = async (transportInfo) => {
    const response = await fetch(`/transport/delete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transportInfo),
    });
    return response.json();
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      let { email, startTime } = transportInfo;
      const deletedTransportInfo = await deleteTransportInfo({
        email,
        startTime,
      });
    } catch (error) {
      console.log("Error in deleting Transport list", error);
    }
  };

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  return (
      <Grid container
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent:"center"
        }}
        sx={{ pt: 3, marginBottom: 2 }}
      >
        <Grid item sx={{display:"flex", justifyContent:"center"}}>
        <Typography justifyContent={"center"} fontWeight={"bold"}>
            Transportation Service Availability Form
          </Typography>
        </Grid>
        
        <Grid item sx={{ width: "50%", pt: 3, marginBottom: 1, display:"flex", justifyContent:"center" }}>
          <ServerRequestDatePicker
          sx={{ width: "50%", pt: 3, marginBottom: 2, display:"flex", justifyContent:"center" }}
            transportInfo={transportInfo}
            setTransportInfo={setTransportInfo}
            />
          </Grid>
          <Grid sx={{ width: "50%", pt: 1, marginBottom: 1, display:"flex", justifyContent:"center" }}>     
          <StartEndTimePicker
            transportInfo={transportInfo}
            setTransportInfo={setTransportInfo}
          />
        </Grid>

        <Grid item>
          <FormGroup row sx={{ py: 1 }}>
            <FormLabel
              sx={{ py: 1, marginRight: 1, fontWeight: "bold", color: "black" }}
              id="demo-row-radio-buttons-group-label"
            >
              Language Spoken
            </FormLabel>

            <FormControlLabel
              control={<Checkbox />}
              name="accessories"
              label="English"
              value="English"
              onChange={getLanguages}
            />
            <FormControlLabel
              control={<Checkbox />}
              name="accessories"
              value="French"
              label="French"
              onChange={getLanguages}
            />
            <FormControlLabel
              control={<Checkbox />}
              name="accessories"
              value="Ukrainian"
              label="Ukrainian"
              onChange={getLanguages}
            />
            <FormControlLabel
              control={<Checkbox />}
              name="accessories"
              value="Mandarin"
              label="Mandarin"
              onChange={getLanguages}
            />
          </FormGroup>
        </Grid>

        <Grid item>
          <FormGroup row>
            <FormLabel
              sx={{ py: 1, marginRight: 1, fontWeight: "bold", color: "black" }}
              id="demo-row-radio-buttons-group-label"
            >
              Accessories
            </FormLabel>

            <FormControlLabel
              control={<Checkbox />}
              name="accessories"
              label="Wheelchair"
              value="Wheelchair"
              onChange={getAccessories}
            />
            <FormControlLabel
              control={<Checkbox />}
              name="accessories"
              value="Carseat"
              label="Carseat"
              onChange={getAccessories}
            />
            <FormControlLabel
              control={<Checkbox />}
              name="accessories"
              value="Medical Equipment"
              label="Medical Equipment"
              onChange={getAccessories}
            />
          </FormGroup>
        </Grid>
        <Grid item sx={{ width: "50%", pt: 2, marginBottom: 2, display:"flex", justifyContent:"center" }}>
          <TextField
            id="number-input"
            name="maxPassengers"
            label="Maximum Passengers (<=5)"
            type="number"
            value={transportInfo.maxPassengers}
            InputProps={{ inputProps: { min: 1, max: 5 } }}
            onChange={(e) => {
              const value =
                e.target.value < 1 ||
                e.target.value === "" ||
                e.target.value > 5
                  ? (e.target.value = 1)
                  : Math.floor(e.target.value);
              setTransportInfo({
                ...transportInfo,
                maxPassengers: value,
              });
            }}
          />
        </Grid>

        <Grid item sx={{ width: "50%", marginBottom: 1, display:"flex", justifyContent:"center" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
  );
};

export default VolunTransportForm;
