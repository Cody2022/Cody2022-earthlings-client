import React from 'react';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import { Categories } from '../Category/Categories';
import { Box } from '@mui/system';


export const Newcomer = () => {
  
  return (
    <Box>
      <Categories />
    </Box>
  )
}

export default withAuthenticationRequired(Newcomer, {
    onRedirecting: () => <Loading />,
  });;