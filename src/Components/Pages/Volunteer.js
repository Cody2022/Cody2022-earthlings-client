import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import volunteeringImage from "../../images/volunteer.jpg"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Fade, Grid, ImageListItem, Paper, Popper, Typography } from "@mui/material";


export const Volunteer = () => {
  const { user } = useAuth0();
  const email = user.email;
  const navigate=useNavigate();


  return (
    <Box>
      <Grid sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h5"
          fontFamily="Comic Sans MS"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 800,
          }}
        >
          If the world becomes a better place tomorrow, it will happen because
          of volunteers like you. Thank you for volunteering!
        </Typography>
      </Grid>
      <Grid container>
        <Grid
          item
          variant="outlined"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <img src={volunteeringImage} />
        </Grid>
        <Grid item sx={{ mt: 5 }}>
          <Card sx={{ maxWidth: 600, mb: 2 }}>
            <CardContent>
              <Typography
                 variant="h6"
                 fontFamily="verdana"
              >
                Help with Transportation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                When it comes to transportation, there are two main challenges
                newcomers face. <br /> The first is the difficulty in
                understanding local public transit which sometimes is a result
                of a language barrier. The second issue is obtaining a driver’s
                license that is recognized in Canada and hence be qualified to
                drive.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" sx={{ textTransform: "capitalize" }} onClick={()=>{navigate("/volunteertransport")}}>
                Provide Transportation Service
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 600, mb: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                fontFamily="verdana"
              >
                Help with Accommodation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Finding housing is critical and an immediate need for
                immigrants. <br /> There are many challenges newcomers face
                while finding a house.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" sx={{ textTransform: "capitalize" }} onClick={()=>{navigate("/volunteeraccommodation")}}>
                Provide Accommodation Service
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 600, mb: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                fontFamily="verdana"
              >
                Help with Translation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                One of the biggest challenges that newcomers could encounter would be a language barrier.
              </Typography>
            </CardContent>
            <Button size="medium" sx={{ textTransform: "capitalize" }} onClick={()=>{navigate("/translateForm")}}>
              Provide Translation Service
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuthenticationRequired(Volunteer, {
  onRedirecting: () => <Loading />,
});
