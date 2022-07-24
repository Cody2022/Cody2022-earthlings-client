import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import school from "../../images/school.jpg";
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

export default function EducationCard() {
  const [expanded, setExpanded] = React.useState(false);
  const navigate=useNavigate()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{borderRadius:5 }} style={{width:350, height: "fit-content"}}>
      <CardHeader
        title="Education"
        titleTypographyProps={{fontSize: "1.2rem", color:"black", align:"center"}}
      />
      <CardMedia
        component="img"
        height="170"
        image={school}
        alt="Education"
      />
     <CardContent sx={{pb:1}}>
        <Typography variant="body3" color="black">
         Need education resources? Click on "Get Assistance" to explore resources provided by governments and institutions.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
         <Button size="medium" sx={{color:"blue", textTransform:"capitalize"}} onClick={()=>{navigate("/education")}}>Get Assistance</Button>
      </CardActions>
    </Card>
  );
}
