import {
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ServerRequestDatePicker from "./ServerRequestDatePicker";
import StartEndTimePicker from "./StartEndTimePicker";
import { useAuth0 } from "@auth0/auth0-react";
import { FormControl } from "react-bootstrap";

const TranslateRequestForm = (props) => {
  const rerender = props.rerender;
  const setRerender = props.setRerender;
  const { user, isLoading } = useAuth0();
  const email = user?.email;
  console.log("user is", email);

  let today = new Date();
  today = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  ); //Grab Year, Month, and Day only

  const defaultTranslateInfo = {
    //task: task,
    via: "",
    email: email,
    date: today,
    startTime: new Date().setSeconds(0, 0),
    endTime: new Date().setSeconds(0, 0),
    fromLanguages: [],
    toLanguages: [],
  };

  const [translateInfo, setTranslateInfo] = useState(defaultTranslateInfo);

  const getType = (e) => {
    const { value, checked } = e.target;
    const { via } = translateInfo;
    // Case 1 : The user checks the selection
    if (checked) {
        setTranslateInfo({
          ...translateInfo,
          via: [...via, value],
        });
      }
      // Case 2  : The user unchecks the selection
      else {
        setTranslateInfo({
          ...translateInfo,
          via: via.filter((e) => e !== value),
        });
      }
  }

  const getLanguages = (e) => {
    const { value, checked } = e.target;
    const { fromLanguages } = translateInfo;
    const { toLanguages } = translateInfo;
    // Case 1 : The user checks the box
    if (checked) {
      setTranslateInfo({
        ...translateInfo,
        fromLanguages: [...fromLanguages, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setTranslateInfo({
        ...translateInfo,
        fromLanguages: fromLanguages.filter((e) => e !== value),
      });
    }
  };

  const getTranslate = (e) => {
    const { value, checked } = e.target;
    const { toLanguages } = translateInfo;
    // Case 1 : The user checks the box
    if (checked) {
      setTranslateInfo({
        ...translateInfo,
        accessories: [...toLanguages, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setTranslateInfo({
        ...translateInfo,
        toLanguages: toLanguages.filter((e) => e !== value),
      });
    }
  };

  const createTranslateInfo = async (translateInfo) => {
    const response = await fetch(`/translate/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(translateInfo),
    });
    return response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newTranslateInfo = await createTranslateInfo(translateInfo);
      setRerender(!rerender);
    } catch (error) {
      console.log(error.message);
    }
  };

  /* Get all translate listings of a volunteer with email*/
  const getTranslateInfo = async (email) => {
    let response = await fetch(`/translate/get/${email}`);
    let translateInfo = await response.json();
    return translateInfo;
  };

  const deleteTranslateInfo = async (translateInfo) => {
    const response = await fetch(`/translate/delete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(translateInfo),
    });
    return response.json();
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      let { email, startTime } = translateInfo;
      const deletedTranslateInfo = await deleteTranslateInfo({
        email,
        startTime,
      });
    } catch (error) {
      console.log("Error in deleting translate list", error);
    }
  };

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  return (
    <Container
      style={{
        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        sx={{ width: "80%", marginTop: 3, marginBottom: 5 }}
      >
        <Grid item marginBottom={2} display={"flex"} justifyContent={"center"}>
          <Typography justifyContent={"center"} fontWeight={"bold"}>
            Translation Request Form
          </Typography>
        </Grid>

        {/* <Grid item style={{ marginTop: 10 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">VIA</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="VIA"
            >
              <MenuItem >Chat</MenuItem>
              <MenuItem >Appointment In Person</MenuItem>
              <MenuItem >Document</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}

        <Grid item style={{ marginTop: 10 }}>
          <ServerRequestDatePicker
            transportInfo={translateInfo}
            setTransportInfo={setTranslateInfo}
          />
        </Grid>

        <Grid item style={{ marginTop: 20 }}>
          <StartEndTimePicker
            transportInfo={translateInfo}
            setTransportInfo={setTranslateInfo}
          />
        </Grid>

        <Grid item>
          <FormGroup row sx={{ py: 1 }}>
            <FormLabel
              sx={{ py: 1, marginRight: 1, fontWeight: "bold", color: "black" }}
              id="demo-row-radio-buttons-group-label"
            >
              From Language
            </FormLabel>

            <FormControlLabel
              control={<Radio />}
              name="accessories"
              label="English"
              value="English"
              onChange={getLanguages}
            />

            <FormControlLabel
              control={<Radio />}
              name="accessories"
              value="Ukrainian"
              label="Ukrainian"
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
              To Languague
            </FormLabel>

            <FormControlLabel
              control={<Radio />}
              name="accessories"
              label="English"
              value="English"
              onChange={getTranslate}
            />
            <FormControlLabel
              control={<Radio />}
              name="accessories"
              value="Ukrainian"
              label="Ukrainian"
              onChange={getTranslate}
            />
          </FormGroup>

          <Grid item display={"flex"} justifyContent={"flex-start"}>
            <Button
              sx={{ my: 2 }}
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TranslateRequestForm;
