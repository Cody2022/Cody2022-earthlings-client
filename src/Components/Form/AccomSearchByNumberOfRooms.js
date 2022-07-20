import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const AccomSearchByNumberOfRooms = (props) => {
  const setNumberOfRoomsFilter = props.setNumberOfRoomsFilter;
  const numberOfRoomsFilter = props.numberOfRoomsFilter;
  const [accomSearchInfo, setAccomSearchInfo] = useState(null);

  const handleSearchByNumberOfRooms = async (event) => {
    setNumberOfRoomsFilter(accomSearchInfo);
  };

  return (
    
      
     
      
    <Container>
      <Typography
        variant="h4"
        component="h2"
        color="blue"
        align="center"
      >
        Number of Rooms
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
            id="number-input"
            name="numberOfRomms"
            label="Number of Rooms"
            type="number"
            value={accomSearchInfo}
            sx={{ py: 2, px: 1 }}
            onChange={(e) => {
              let value = e.target.value;
              setAccomSearchInfo(value);
            }}
          />
          
        </Grid>
      </Box>
      <Grid container sx={{m:1, display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Box >
          <Button
            onClick={handleSearchByNumberOfRooms}
            type="submit"
            color="primary"
            variant="contained"
          >
            Search By Number of Rooms
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};

export default AccomSearchByNumberOfRooms;
