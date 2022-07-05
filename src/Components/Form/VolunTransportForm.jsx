
import { Button, Checkbox, Container, FormControlLabel, FormGroup, FormLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import ServerRequestDatePicker from "./ServerRequestDatePicker";
import StartEndTimePicker from './StartEndTimePicker';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";



const VolunTransportForm = () => {
    const { user, isLoading } = useAuth0();
    let email=user.email;
    console.log("user.email is", user.email)

    const defaultTransportInfo = {
      email:email,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      languages: [],
      accessories: [],
      maxPassengers: 1,
    };
  

    const [transportInfo, setTransportInfo] = useState(defaultTransportInfo);

    console.log("default date", defaultTransportInfo.date)

    const getLanguages = (e) => {
        const {value, checked}=e.target;
        const {languages}=transportInfo;
        // Case 1 : The user checks the box
        if (checked) {
          setTransportInfo({...transportInfo,
           languages: [...languages, value],
          });
        }
         // Case 2  : The user unchecks the box
          else {
            setTransportInfo({...transportInfo,
              languages: languages.filter((e) => e !== value),
            });
          }
      };

      const getAccessories = (e) => {
        const {value, checked}=e.target;
        const {accessories}=transportInfo;
        // Case 1 : The user checks the box
        if (checked) {
          setTransportInfo({...transportInfo,
            accessories: [...accessories, value],
          });
        }
         // Case 2  : The user unchecks the box
          else {
            setTransportInfo({...transportInfo,
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
        console.log("transportInfo.date is", transportInfo.date)
        console.log("transportInfo.date typeof", typeof transportInfo.date)
        console.log("transportInfo.startTime is", transportInfo.startTime)
        console.log("transportInfo.endTime is", transportInfo.endTime)
        try {
          const newTransportInfo=await createTransportInfo(transportInfo);
        }catch{
          console.log("Error in creating Transport Form")
        }
      };

      const getTransportInfo = async (email) => {
        let response = await fetch(`/transport/get/${email}`);
        let transportInfo = await response.json();
        console.log(transportInfo)
        return transportInfo;
      };

      const handleGet = async (event) => {
        event.preventDefault();
        console.log("test")
        const foundTransportInfo=await getTransportInfo("volunteer@gmail.com");
        // console.log("foundTransportInfo is", foundTransportInfo)
        console.log("foundTransportInfo startTime is", foundTransportInfo.startTime)
        console.log("foundTransportInfo startTime type is", typeof foundTransportInfo.startTime)
        console.log("foundTransportInfo startTime new Date is", new Date(foundTransportInfo.startTime))
        console.log("foundTransportInfo startTime new Date - getDate is", new Date(foundTransportInfo.startTime).toLocaleDateString())
      }
      

  return (
    <Container>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        sx={{ width: "55%", marginTop: 5, marginBottom: 10 }}
      >
        <Grid item marginBottom={2}>
          <Typography fontWeight={"bold"}>Volunteer Transportation Form</Typography>
        </Grid>

        <Grid item style={{ marginTop: 10 }}>
          <ServerRequestDatePicker transportInfo={transportInfo} setTransportInfo={setTransportInfo}/>
        </Grid>

        <Grid item style={{ marginTop: 20 }}>
          <StartEndTimePicker transportInfo={transportInfo} setTransportInfo={setTransportInfo}/>
        </Grid>

        <Grid item>
          <FormGroup row sx={{ py: 1 }}>
            <FormLabel
              sx={{ py: 1, marginRight:1, fontWeight: "bold", color: "black" }}
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
          <FormGroup row >
            <FormLabel
              sx={{ py: 1, marginRight:1, fontWeight: "bold", color: "black" }}
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
              value="carseat"
              label="Carseat"
              onChange={getAccessories}
            />
            <FormControlLabel
              control={<Checkbox />}
              name="accessories"
              value="medicalEquip"
              label="Medical Equipment"
              onChange={getAccessories}
            />
          </FormGroup>
        </Grid>
        <Grid item marginTop={2}>
          <TextField
            id="number-input"
            name="maxPassengers"
            label="Maximum Passengers (<=5)"
            type="number"
            value={transportInfo.maxPassengers}
            InputProps={{ inputProps: { min: 1, max:5 } }}
            sx={{ py: 1 }}
            onChange={(e) => {
              const value = (e.target.value<1 || e.target.value==="" ||e.target.value>5)? (e.target.value=1): Math.floor(e.target.value);
              // const value = e.target.value
              setTransportInfo({
                ...transportInfo,
                maxPassengers: value,
              });
            }}
          />
        </Grid>

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

          {/* <Button
            sx={{ my: 2 }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleGet}
          >
            Get transport
          </Button> */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default VolunTransportForm