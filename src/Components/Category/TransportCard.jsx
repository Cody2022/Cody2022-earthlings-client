import * as React from 'react';
import {useNavigate } from "react-router-dom";
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
      style={{ width: 350, height: "fit-content" }}
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
      <CardContent>
        <Typography variant="body3" color="text.secondary">
          Get Assistance with Transportation
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          size="medium"
          sx={{ color: "blue" }}
          onClick={() => navigate("/newcomertransport")}
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
          <Typography paragraph>Get transport assistance.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
