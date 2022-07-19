import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import translation from "../../images/translation.jpg";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';



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

export default function TranslationCard() {
  const [expanded, setExpanded] = React.useState(false);
  const navigate=useNavigate();


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{borderRadius:5 }} style={{width:350, height: "fit-content"}}>
      <CardHeader
        title="Translation"
        titleTypographyProps={{fontSize: "1.2rem", color:"black", align:"center"}}
      />
      <CardMedia
        component="img"
        height="170"
        image={translation}
        alt="Translation"
      />
      <CardContent>
        <Typography variant="body3" color="text.secondary">
         Get Assistance with Translation
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Button
          size="medium"
          sx={{ color: "blue" }}
          onClick={() => navigate("/translateList")}
        >
          Get Assistance
        </Button>
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
            Get Translation assistance.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
