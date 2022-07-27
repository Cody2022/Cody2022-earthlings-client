import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import ServerRequestDatePicker from "./ServerRequestDatePicker";
import StartEndTimePicker from "./StartEndTimePicker";
import { useAuth0 } from "@auth0/auth0-react";
import { FormControl } from "react-bootstrap";
import {useNavigate } from "react-router-dom";

//This
const TranslateVolunteerForm = (props) => {
  const rerender = props.rerender;
  const setRerender = props.setRerender;
  const { user, isLoading } = useAuth0();
  const name = user?.name;
  const email = user?.email;
  console.log("user is", email);
  const navigate=useNavigate();


  const [translateInfo, setTranslateInfo] = useState();
  const [fromLanguage, setfromLanguage] = useState([]);
  const [toLanguage, settoLaguage] = useState([]);

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
        task: "Translate",
        name: name,
        email: email,
        date: today,
        startTime: new Date().setSeconds(0, 0),
        endTime: new Date().setSeconds(0, 0),
        fromLanguage: [],
        toLanguage: [],
      };
      setTranslateInfo(defaultTranslateInfo)
    }

},[user])


  const getLanguage = (e) => {
    const { value, checked } = e.target;
    const { fromLanguage } = translateInfo;
    // Case 1 : The user checks the box
    if (checked) {
      setTranslateInfo({
        ...translateInfo,
        fromLanguage: [...fromLanguage, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setTranslateInfo({
        ...translateInfo,
        fromLanguage: fromLanguage.filter((e) => e !== value),
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
    console.log(`REACH ME`)

    return response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`CALENDAR NAV`)
    try {
      const newTranslateInfo = await createTranslateInfo();
      console.log(`New Translate`, newTranslateInfo)
      navigate("/calendar");
      setRerender(!rerender);
    } catch (error) {
      console.log(error.message);
    }
    // navigate("/calendar")
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
        sx={{ width: "100%", marginTop: 3, marginBottom: 5 }}
      >
        <Grid item marginBottom={2} display={"flex"} justifyContent={"left"}>
        <Typography
        variant="h6"
        component="h2"
        color="blue"
        // align="center"
        // pt={5}
      >
            Volunteer Translation Form
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
              control={<Checkbox />}
              name="fromLanguage"
              label="English"
              value="English"
              onChange={getLanguage}
            />

            <FormControlLabel
              control={<Checkbox />}
              name="fromLanguage"
              value="Ukrainian"
              label="Ukrainian"
              onChange={getLanguage}
            />

            <FormControlLabel
              control={<Checkbox />}
              name="fromLanguage"
              value="Somali"
              label="Somali"
              onChange={getLanguage}
              
            />
            <FormControlLabel
              control={<Checkbox />}
              name="fromLanguage"
              value="Mandarin"
              label="Mandarin"
              onChange={getLanguage}
              
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
              control={<Checkbox />}
              name="toLanguage"
              label="English"
              value="English"
              onChange={getTranslate}
            />
            <FormControlLabel
              control={<Checkbox />}
              name="toLanguage"
              value="Ukrainian"
              label="Ukrainian"
              onChange={getTranslate}
            />
            <FormControlLabel
              control={<Checkbox />}
              name="toLanguage"
              value="Somali"
              label="Somali"
              onChange={getTranslate}
            />
            <FormControlLabel
              control={<Checkbox />}
              name="toLanguage"
              value="Mandarin"
              label="Mandarin"
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

export default TranslateVolunteerForm;