import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function VolunteerCard() {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [volunteer, setVolunteer] = React.useState("");
  const [volunteerInfo, setVolunteerInfo] = useState("");

  const fullName = volunteerInfo.firstName + " " + volunteerInfo.lastName;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //Get volunteer by email
  React.useEffect(() => {
    const getImage = async () => {
      let response = await fetch(`/image/ben12@gmail.com`);
      let data = await response.json();
      setVolunteer(data);
    };
    getImage();
  }, []);

  useEffect(() => {
    const getFeaturedVolunteerInfo = async () => {
      try {
        const response = await axios.get("/name?email=ben12@gmail.com");
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
    navigate("/chat");
  };

  if (!user || !volunteer || !volunteerInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      sx={{ borderRadius: 1, border: 1 }}
      style={{ width: 300, backgroundColor: "rgba(48, 233, 252, 0.21)" }}
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
          Speaks: {volunteerInfo.languages.join(", ")}
          <br />
          Email: {volunteerInfo.email}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          size="medium"
          sx={{ color: "purple", fontFamily: "Raleway" }}
          onClick={() => {
            createConversation();
          }}
        >
          Contact me
        </Button>
      </CardActions>
    </Card>
  );
}
