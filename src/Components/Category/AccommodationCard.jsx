import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {useNavigate } from "react-router-dom";

import housing from "../../images/housing.jpg";
import { Button } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AccommodationCard() {
  const [expanded, setExpanded] = React.useState(false);
  const navigate=useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{borderRadius:5 }} style={{width:360, height: "fit-content"}}>
      <CardHeader
        title="Accommodation"
        titleTypographyProps={{fontSize: "1.2rem", color:"black", align:"center"}}
      />
      <CardMedia
        component="img"
        height="170"
        image={housing}
        alt="Accommodation"
      />
      <CardContent sx={{pb:1}}>
        <Typography variant="body3" color="black">
        Need a place to stay? Click on “Get Assistance” to search for accommodations offered by our volunteers.
        </Typography>
      </CardContent>
      <CardActions >
         <Button 
         size="medium" 
         sx={{color:"blue", textTransform:"capitalize" }} 
         onClick={() => navigate("/newcomeraccommodation")}
         >
          Get Assistance
          </Button>
      </CardActions>
    </Card>
  );
}
