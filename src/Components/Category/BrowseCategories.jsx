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
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        I Am Here
      </Typography>
      <Typography variant="h5" component="div">
       Browse All Categories Enter Point
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
       I am here
      </Typography>
      <Typography variant="body2">
        Motto.
        <br />
        {"Information"}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Find More</Button>
    </CardActions>
  </React.Fragment>
);

const BrowseCategories = () => {
  return (
    <Box sx={{display:"flex", justifyContent:"center"}}>
      <Card item style={{width:550, display:"flex", justifyContent:"center", flexDirection: "column"}} variant="outlined">{card}</Card>
    </Box>
  );
}

export default BrowseCategories

