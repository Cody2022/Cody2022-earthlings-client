import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
      Welcome to the Newcomer Services Page.
      </Typography>
      <Typography sx={{ m: 1.5 }} color="text.secondary">
      To access any of the services or find resources, simply click on the "Get Assistance" for more information and to get started! 
      </Typography>
      <Typography variant="body1">
      We are glad to be part of your journey in Canada!
       </Typography>
    </CardContent>
  </React.Fragment>
);

const BrowseCategories = () => {
  return (
    <Box sx={{display:"flex", justifyContent:"center"}}>
      <Card style={{width:550, display:"flex", justifyContent:"center", flexDirection: "column"}} variant="outlined">{card}</Card>
    </Box>
  );
}

export default BrowseCategories

