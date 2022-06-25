import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import avatar1 from "../../images/avatar1.jpg";
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

export default function VolunteerCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{borderRadius:1, border: 1, marginBottom:2 }} style={{width:250, backgroundColor:"rgba(48, 233, 252, 0.21)"}}>
      <CardHeader
        title="Volunteer Name-1"
        titleTypographyProps={{fontSize: "1rem", color:"black", align:"left"}}
      />
      <CardMedia
        component="img"
        height="150"
        image={avatar1}
        alt="volunteerImage"
      />
      <CardContent>
        <Typography variant="body3" color="text.secondary">
         Volunteer brief introduction ....
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
         <Button size="medium" sx={{color:"purple", fontFamily: 'Raleway'}} >Contact me</Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>More information:</Typography>
          <Typography paragraph>
            Contact Information.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
