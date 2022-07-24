import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import volunteeringImage from "../../images/volunteer.jpg"
import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Paper, Typography } from "@mui/material";


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
          of volunteers like you. 
        </Typography>
      </Grid>
      <Divider sx={{ p: 1}}>
        <Typography color="CaptionText" fontSize="1.2rem" fontFamily="Comic Sans MS">
        Thank you for volunteering!
        </Typography>
      </Divider>
      <Grid container>
        <Grid
          item
          variant="outlined"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <img src={volunteeringImage} />
        </Grid>
        <Grid item sx={{ mt: 3 }}>
          <Paper sx={{ maxWidth: 600, mb: 1 }} elevation={0}>
            <Typography variant="h6" fontFamily="verdana" sx={{ pb: 1 }}>
              Help with Accommodation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Finding housing is critical and an immediate need for newcomers.
              Newcomers, including immigrants and refugees, often face
              increasing barriers to affordable housing. This puts many
              newcomers at risk of homelessness because of various factors,
              such as poverty, racism, discrimination, delays in work permits and/or health related issues.
            </Typography>
            <Button
              size="medium"
              sx={{ textTransform: "capitalize", pt: 1, py: 1 }}
              onClick={() => {
                navigate("/volunteeraccommodation");
              }}
            >
              Provide Accommodation Service
            </Button>
          </Paper>
          <Paper sx={{ maxWidth: 600, mb: 2 }} elevation={0}>
            <Typography variant="h6" fontFamily="verdana" sx={{ pb: 1 }}>
              Help with Transportation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              When it comes to transportation, there are two main challenges
              newcomers face. <br /> The first is the difficulty in
              understanding local public transit which sometimes is a result of
              a language barrier. The second issue is obtaining a driver’s
              license that is recognized in Canada and hence be qualified to
              drive.
            </Typography>
            <Button
              size="medium"
              sx={{ textTransform: "capitalize", pt: 1, py: 1 }}
              onClick={() => {
                navigate("/volunteertransport");
              }}
            >
              Provide Transportation Service
            </Button>
          </Paper>

          <Paper sx={{ maxWidth: 600, mb: 1 }} elevation={0}>
            <Typography variant="h6" fontFamily="verdana" sx={{ pb: 1 }}>
              Help with Translation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              One of the biggest challenges that newcomers could encounter would
              be a language barrier. Translation and interpretations services
              are vital to helping Newcomers access appointments, legal
              documents, healthcare, and education for their children.
            </Typography>
            <Button
              size="medium"
              sx={{ textTransform: "capitalize", pt: 1, py: 1 }}
              onClick={() => {
                navigate("/translateForm");
              }}
            >
              Provide Translation Service
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuthenticationRequired(Volunteer, {
  onRedirecting: () => <Loading />,
});
