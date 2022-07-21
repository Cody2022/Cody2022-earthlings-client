import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

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
      <Typography variant="h5" fontFamily="Comic Sans MS" component="div" display={"flex"} justifyContent={"center"}>
      Welcome to the Newcomer Services Page
      </Typography>
      <Typography sx={{ m: 1.5 }} color="text.secondary" display={"flex"} justifyContent={"center"}>
      To access any of the services or find resources, simply click on the "Get Assistance" for more information and to get started! 
      </Typography>
      <Typography variant="h6" display={"flex"} justifyContent={"center"}>
      We are glad to be part of your journey in Canada!
       </Typography>
    </CardContent>
  </React.Fragment>
);

const BrowseCategories = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center"  }}>
      <Paper
        style={{
          width: 550,
          display: "flex",
          alignContent:"center",
          flexDirection: "column",
          background:"rgba(95, 10, 246, 0)"
        }}
        // variant="outlined"
        elevation={0}
      >
        {card}
      </Paper>
    </Box>
  );
}

export default BrowseCategories

