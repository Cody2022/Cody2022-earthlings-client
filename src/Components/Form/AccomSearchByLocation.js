import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
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
  Typography,
} from "@mui/material";

const AccomSearchByLocation = (props) => {
  const setAccomLocationFilter = props.setAccomLocationFilter;
  const accomLocationFilter = props.setAccomLocationFilter;
  const [accomSearchInfo, setAccomSearchInfo] = useState(null);

  const handleSearchByLocation = async (event) => {
    setAccomLocationFilter(accomSearchInfo);
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" color="blue" align="center">
        Location
      </Typography>

      <Box
        component="span"
        m={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          container
          sx={{
            m: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
              value={accomSearchInfo}
              onChange={(e) => {
                let value = e.target.value;
                setAccomSearchInfo(value);
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
      </Box>
      <Grid
        container
        sx={{
          m: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Button
            onClick={handleSearchByLocation}
            sx={{ my: 0 }}
            type="submit"
            color="primary"
            variant="contained"
          >
            Search By Location
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};
export default AccomSearchByLocation;
