import React, { useState } from "react";
import { Button, Card, Collapse, Link, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import Popover from '@mui/material/Popover';


const TransportationData = (props) => {
  const transportInfo = props.transportInfo;
  const [anchorEl, setAnchorEl] = useState(null);
  const [volunteerProfile, setVolunteerProfile]=useState()

  const handleClick =async (event) => {
    setAnchorEl(event.currentTarget); 
    let response = await fetch(`/get/${transportInfo.email}`);
    let foundVolunteerProfile = await response.json();
    console.log(foundVolunteerProfile)
    setVolunteerProfile(foundVolunteerProfile)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Card sx={{pl:1, margin:1, minWidth:310 }} xs={12} sm={6} md={4}>
      <Typography variant="h5">
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
      <Typography >Languages:</Typography>
      <ul style={{marginTop:4, marginBottom:4}}>
        {transportInfo.languages.map((language, index) => {
          return <li key={index}>{language}</li>;
        })}
      </ul>
      <Typography>Accessories:</Typography>
      <ul style={{marginTop:4, marginBottom:4}}>
        {transportInfo.accessories.map((accessory, index) => {
          return <li key={index}>{accessory}</li>;
        })}
      </ul>
      
      <div>
      <Button style={{marginTop: 5, marginBottom:3}} aria-describedby={id} variant="contained" onClick={handleClick}>
        About the Volunteer
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {volunteerProfile && 
        <div>
          <Typography sx={{ p: 2 }}>{volunteerProfile.email}</Typography>
          <Typography sx={{ p: 2 }}>First name:{volunteerProfile.firstName}</Typography>
        </div>}
      </Popover>
    </div>
    </Card>
  );
};

export default TransportationData;
