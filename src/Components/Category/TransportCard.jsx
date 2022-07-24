import * as React from 'react';
import {useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ctrain from "../../images/ctrain.jpg";
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

export default function TransportCard() {
  const [expanded, setExpanded] = React.useState(false);
  const navigate=useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{ borderRadius: 5 }}
      style={{ width: 360, height: "fit-content" }}
    >
      <CardHeader
        title="Transportation"
        titleTypographyProps={{
          fontSize: "1.2rem",
          color: "black",
          align: "center",
        }}
      />
      <CardMedia component="img" height="170" image={ctrain} alt="transport" />
      <CardContent sx={{pb:1}}>
        <Typography variant="body3" color="black">
        Need help getting transportation service? Click on “Get Assistance” to search for volunteers offering transportation help.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          size="medium"
          sx={{ color: "blue" , textTransform:"capitalize"}}
          onClick={() => navigate("/newcomertransport")}
        >
          Get Assistance
        </Button>
      </CardActions>
    </Card>
  );
}
