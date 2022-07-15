import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Loading from "../Loading/Loading";

const AccommodationForm = (props) => {
  const { user, isLoading } = useAuth0();
  const email = user?.email;
  let accomListRender=props.accomListRender;
  let setAccomListRender=props.setAccomListRender;

  console.log("user is", email);

  const defaultAccomListInfo = {
    email: email,
    startDate: "",
    endDate: "",
    numberOfRooms: 0,
    maxNumTenants: 0,
    location: "",
    allowPets: "",
    accommodationType: "",
    accessibleHome: "",
  };
  const [accomListInfo, setAccomListInfo] = useState(defaultAccomListInfo);

  const createAccomList = async (accomListInfo) => {
    const response = await fetch(`/accommodation/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accomListInfo),
    });
    return response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("email is", email);
    console.log("accomInfo.startDate is", accomListInfo.startDate);
    console.log("accomInfo.endDate is", accomListInfo.endDate);
    console.log("accomInfo.numberOfRooms is", accomListInfo.numberOfRooms);
    console.log("accomInfo.maxNumTenants is", accomListInfo.maxNumTenants);
    console.log("accomInfo.accessibleHome is", accomListInfo.accessibleHome);
    console.log("accomInfo.email is", accomListInfo.email);
    try {
      const newAccomInfo = await createAccomList(accomListInfo);
      setAccomListRender(!accomListRender)
    } catch {
      console.log("Error in creating Accommodation Form");
    }
  };
  if (isLoading) {
    return <div>isLoading...</div>;
  }

  return (
    <Container>
      <Typography
        variant="h4"
        component="h2"
        color="blue"
        align="center"
        mt={5}
      >
        Volunteer Accommodation Availablility Form
      </Typography>
      <br />
      <Box
        component="span"
        m={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          container
          alignItems="center"
          justify="center"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            required
            id="date-input"
            name="startDate"
            label="Start Date"
            type="date"
            value={accomListInfo.startDate}
            sx={{ py: 2, px: 1 }}
            onChange={(e) => {
              let value = e.target.value;
              setAccomListInfo({ ...accomListInfo, startDate: value });
            }}
          />
          <TextField
            required
            id="date-input"
            name="endDate"
            label="End Date"
            type="date"
            value={accomListInfo.endDate}
            sx={{ py: 2, px: 1 }}
            onChange={(e) => {
              let value = e.target.value;
              setAccomListInfo({ ...accomListInfo, endDate: value });
            }}
          />

          <TextField
            required
            id="number-input"
            name="numberOfRomms"
            label="Number of Rooms"
            type="number"
            value={accomListInfo.numberOfRooms}
            sx={{ py: 2, px: 1 }}
            onChange={(e) => {
              let value = e.target.value;
              setAccomListInfo({ ...accomListInfo, numberOfRooms: value });
            }}
          />
          <TextField
            required
            id="number-input"
            name="maxNumTenants"
            label="Max Number of Tenants"
            type="number"
            value={accomListInfo.maxNumTenants}
            sx={{ py: 2, px: 1 }}
            onChange={(e) => {
              let value = e.target.value;
              setAccomListInfo({ ...accomListInfo, maxNumTenants: value });
            }}
          />
        </Grid>
      </Box>

      <br />
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Accommodations Location
          </FormLabel>
          <RadioGroup
            row
            name="location"
            value={accomListInfo.location}
            onChange={(e) => {
              let value = e.target.value;
              setAccomListInfo({ ...accomListInfo, location: value });
            }}
          >
            <FormControlLabel
              key="north"
              name="north"
              value="north"
              control={<Radio />}
              label="North"
            />

            <FormControlLabel
              key="northEast"
              name="northEast"
              value="northEast"
              control={<Radio />}
              label="North East"
            />
            <FormControlLabel
              key="northWest"
              name="northWest"
              value="northWest"
              control={<Radio />}
              label="North West"
            />
            <FormControlLabel
              key="south"
              name="south"
              value="south"
              control={<Radio />}
              label="South"
            />

            <FormControlLabel
              key="southEast"
              name="southEast"
              value="southEast"
              control={<Radio />}
              label="South East"
            />
            <FormControlLabel
              key="southWest"
              name="southWest"
              value="southWest"
              control={<Radio />}
              label="South West"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <br />
      <Box
        component="span"
        m={1}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              Accommodation Type
            </FormLabel>
            <RadioGroup
              row
              name="accommodationType"
              value={accomListInfo.accommodationType}
              onChange={(e) => {
                let value = e.target.value;
                setAccomListInfo({
                  ...accomListInfo,
                  accommodationType: value,
                });
              }}
            >
              <FormControlLabel
                key="apartment"
                name="apartment"
                value="apartment"
                control={<Radio />}
                label="Apartment"
              />
              <FormControlLabel
                key="house"
                name="house"
                value="house"
                control={<Radio />}
                label="House"
              />
              <FormControlLabel
                key="others"
                name="others"
                value="others"
                control={<Radio />}
                label="Others"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <br />
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              Accessible Home Design?
            </FormLabel>
            <RadioGroup
              row
              name="accessibleHome"
              value={accomListInfo.accessibleHome}
              onChange={(e) => {
                let value = e.target.value;
                setAccomListInfo({ ...accomListInfo, accessibleHome: value });
              }}
            >
              <FormControlLabel
                key="yes"
                name="yes"
                value="yes"
                control={<Radio />}
                label="Yes"
              />

              <FormControlLabel
                key="no"
                name="no"
                value="no"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Box>

      <br />
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <FormControl>
          <FormLabel sx={{ fontWeight: "bold", color: "black" }}>
            Pets Allowed?
          </FormLabel>
          <RadioGroup
            row
            name="allowPets"
            value={accomListInfo.allowPets}
            onChange={(e) => {
              let value = e.target.value;
              setAccomListInfo({ ...accomListInfo, allowPets: value });
            }}
          >
            <FormControlLabel
              key="yes"
              name="yes"
              value="yes"
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              key="no"
              name="no"
              value="no"
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <br />

      <Grid container justify="center">
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Button
            onClick={handleSubmit}
            sx={{ my: 0 }}
            type="submit"
            color="primary"
            variant="contained"
          >
            Create Listing
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};

// export default AccommodationForm;
export default withAuthenticationRequired(AccommodationForm, {
  onRedirecting: () => <Loading />,
});
