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


import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [volunteer, setVolunteer] = React.useState("");
  const [volunteerInfo, setVolunteerInfo] = React.useState("");

  const fullName = volunteerInfo.firstName + " " + volunteerInfo.lastName;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //Get volunteer by email
  React.useEffect(() => {
    const getImage = async () => {
      let response = await fetch(`/image/cassy@gmail.com`);
      let data = await response.json();
      setVolunteer(data);
    };
    getImage();
  }, []);

  React.useEffect(() => {
    const getFeaturedVolunteerInfo = async () => {
      try {
        const response = await axios.get("/name?email=cassy@gmail.com");
        setVolunteerInfo(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getFeaturedVolunteerInfo();
  }, []);

  //Use fetch to create a new conversation
  const createConversation = async () => {
    const newConversation = {
      members: {
        senderEmail: user.email,
        recieverEmail: volunteer.email,
      },
    };

    const data = JSON.stringify(newConversation);
    await fetch("/conversation", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
  };

  return (
    <Card
      sx={{ borderRadius: 1, border: 1 }}
      style={{ width: 250, backgroundColor: "rgba(48, 233, 252, 0.21)" }}
    >
      <CardHeader
        title={fullName}
        titleTypographyProps={{
          fontSize: "1rem",
          color: "black",
          align: "left",
        }}
      />
      <CardMedia
        component="img"
        height="150"
        image={volunteer.profilePic}
        alt="volunteerImage"
      />
      <CardContent>
        <Typography variant="body3" color="text.secondary">
          Lives in: {volunteerInfo.city}, {volunteerInfo.province}
          <br />
          Speaks: {volunteerInfo.languages}
          <br />
          Email: {volunteerInfo.email}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          size="medium"
          sx={{ color: "purple", fontFamily: "Raleway" }}
          onClick={() => {
            navigate("/chat");
            createConversation();
          }}
        >
          Contact me
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
          <Typography paragraph>Contact Information.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
