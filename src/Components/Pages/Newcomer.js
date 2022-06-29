import React from 'react';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import { Categories } from '../Category/Categories';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

export const Newcomer = () => {
  return (
    <Box
     style={{background:"#10e1eb54", backgroundSize: "cover"}}>
      <Grid>
        Newcomer
      </Grid>
      <Categories />
    </Box>
  )
}

export default withAuthenticationRequired(Newcomer, {
    onRedirecting: () => <Loading />,
  });;