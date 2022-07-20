import React from 'react';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import { Categories } from '../Category/Categories';
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import AccommodationList from '../AccommodationList';


export const Newcomer = () => {
  
  return (
    <Box
     style={{background:"#10e1eb54", backgroundSize: "cover"}}>
      <Grid>
        Newcomer
      </Grid>
      <Categories />
       
      {/* <Typography variant='h6' mx={3}>Available Accommodations</Typography> */}
      {/* <AccommodationList /> */}
    </Box>
  )
}

export default withAuthenticationRequired(Newcomer, {
    onRedirecting: () => <Loading />,
  });;