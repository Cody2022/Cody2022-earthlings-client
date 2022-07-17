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
import React, { useEffect, useState } from "react";
import ServerRequestDatePicker from "../Form/ServerRequestDatePicker";
import StartEndTimePicker from "../Form/StartEndTimePicker";
import { useAuth0 } from "@auth0/auth0-react";
import { FormControl } from "react-bootstrap";

const TranslateRequestForm = (props) => {
  const rerender = props.rerender;
  const setRerender = props.setRerender;
  const { user, isLoading } = useAuth0();
  const email = user?.email;
  console.log("user is", email);

const [translateInfo, setTranslateInfo] = useState();
  useEffect(()=>{
    let today = new Date();
    today = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0
    ); //Grab Year, Month, and Day only
    if(user){
      const defaultTranslateInfo = {
        email: email,
        date: today,
        startTime: new Date().setSeconds(0, 0),
        endTime: new Date().setSeconds(0, 0),
        fromLanguages: [],
        toLanguages: [],
      };
      setTranslateInfo(defaultTranslateInfo)
    }

},[user])

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
    const { toLanguage } = translateInfo;
    // Case 1 : The user checks the box
    if (checked) {
      setTranslateInfo({
        ...translateInfo,
        toLanguage: [...toLanguage, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setTranslateInfo({
        ...translateInfo,
        toLanguage: toLanguage.filter((e) => e !== value),
      });
    }
  };

  const createTranslateInfo = async () => {
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
      const newTranslateInfo = await createTranslateInfo();
      setRerender(!rerender);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading || !user || !translateInfo) {
    return <div>Loading...</div>;
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
              name="fromLanguage"
              label="English"
              value="English"
              onChange={getLanguages}
            />

            <FormControlLabel
              control={<Radio />}
              name="fromLanguage"
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
              name="toLanguage"
              label="English"
              value="English"
              onChange={getTranslate}
            />
            <FormControlLabel
              control={<Radio />}
              name="toLanguage"
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
