import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, Collapse, Container, Link, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import Popover from '@mui/material/Popover';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom";



const TransportationData = (props) => {
  const transportInfo = props.transportInfo;
  const [anchorEl, setAnchorEl] = useState(null);
  const [volunteerProfile, setVolunteerProfile]=useState()
  const [volunteerWithPicture, setVolunteerWithPicture] = useState("");
  const { user } = useAuth0();
  const navigate = useNavigate();

 
 //Use fetch to create a new conversation
    const createConversation = async (volunteerEmail) => {
      const newConversation = {
        members: {
          senderEmail: user.email,
          recieverEmail: volunteerEmail,
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


  const handleClick =async (event) => {
    setAnchorEl(event.currentTarget); 
    let response = await fetch(`/get/${transportInfo.email}`);
    let foundVolunteerProfile = await response.json();
    // console.log(foundVolunteerProfile)
    setVolunteerProfile(foundVolunteerProfile)
    let responseForImage = await fetch(`/image/${transportInfo.email}`);
    let volunteerData = await responseForImage.json();
    setVolunteerWithPicture(volunteerData);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Card
      sx={{
        pl: 1,
        margin: 1,
        minWidth: 300,
        display: "grid",
        alignContent: "space-around",
        borderRadius: 5,
        boxShadow: 5,
      }}
      xs={12}
      sm={6}
      md={3}
    >
      <Typography variant="h6">
        {new Date(transportInfo.date).toDateString()}
      </Typography>
      <Typography>
        Start Time:{" "}
        {new Date(transportInfo.startTime).toLocaleString("en-US", {
          hour12: false,
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography>
        End Time:{" "}
        {new Date(transportInfo.endTime).toLocaleString("en-US", {
          hour12: false,
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography>Languages:</Typography>
      <ul style={{ marginTop: 2, marginBottom: 4 }}>
        {transportInfo.languages.map((language, index) => {
          return <li key={index}>{language}</li>;
        })}
      </ul>
      <Typography>Accessories:</Typography>
      <ul style={{ marginTop: 4, marginBottom: 4 }}>
        {transportInfo.accessories.map((accessory, index) => {
          return <li key={index}>{accessory}</li>;
        })}
      </ul>

      <Button
        style={{ marginTop: 3, marginBottom: 3 }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        About the Volunteer
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {volunteerProfile && (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt={volunteerProfile.firstName}
              height="150"
              image={volunteerWithPicture.profilePic}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                First name: {volunteerProfile.firstName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {volunteerProfile.bio}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="medium"
                sx={{ color: "purple", fontFamily: "Raleway" }}
                onClick={() => {
                  navigate("/chat");
                  createConversation(volunteerProfile.email);
                }}
              >
                Chat with me
              </Button>
            </CardActions>
          </Card>
        )}
      </Popover>
    </Card>
  );
};

export default TransportationData;
