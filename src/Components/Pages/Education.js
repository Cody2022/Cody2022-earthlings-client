import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Fade, Grid, ImageListItem, Link, Paper, Typography } from "@mui/material";
import Loading from "../Loading/Loading";
import Educationlanding from "../../images/EducationLanding.jpg"
import learning from "../../images/learning.jpg"


export const Education = () => {
  const { user } = useAuth0();
  const email = user.email;
  const navigate=useNavigate();


  return (
    <Box>
      <Grid sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h5"
          fontFamily="Comic Sans MS"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 900,
          }}
        >
          “Education is not preparation for life; education is life itself.”
          —John Dewey
        </Typography>
      </Grid>
      <Divider sx={{ p: 3 }}>
        <Typography color="CaptionText" fontSize="1.2rem">
          Find Resources
        </Typography>
      </Divider>
      <Grid container display={"flex"} justifyContent={"center"}>
      <Paper sx={{ maxWidth: 400, maxHeight:200, m: 2 }} elevation={0} xs={4}>
          <img src={learning} />
        </Paper>
        <Paper sx={{ maxWidth: 400, m: 2 }} xs={4} elevation={0}>
          <Link
            href="https://alis.alberta.ca/explore-education-and-training/"
            fontFamily={"verdana"}
            variant="h6"
          >
            Explore Education and Training in Alberta
          </Link>
          <br />
          <Typography variant="body" fontFamily="verdana">
            If you're a newcomer to Alberta who is planning your education, then
            the information and resources in this section are a good place to
            begin.
          </Typography>
        </Paper>

        <Paper sx={{ maxWidth: 400, m: 2 }} xs={4} elevation={0}>
          <Link href="https://www.immigrant-education.ca/about-us/" fontFamily={"verdana"} variant="h6">
            The Immigrant Education Society (TIES)
          </Link>
          <br />
          <Typography variant="body" fontFamily="verdana">
            The Immigrant Education Society (TIES) is a not-for-profit
            charitable organization that has been serving Calgary for over 30
            years.
          </Typography>
        </Paper>
        <Paper sx={{ maxWidth: 400, m: 2 }} elevation={0} xs={4}>
          <Link href="https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/prepare-life-canada/prepare-work/federal-internship.html" fontFamily={"verdana"} variant="h6">
            Federal Internship for Newcomers (FIN) Program
          </Link>
          <br />
          <Typography variant="body" fontFamily="verdana">
            The Federal Internship for Newcomers (FIN) Program offers eligible
            newcomers a chance to gain valuable temporary work experience and
            training opportunities with Canadian federal, provincial and
            municipal organizations.
          </Typography>
        </Paper>
        <Paper sx={{ maxWidth: 400, m: 2 }} elevation={0} xs={4}>
          <Link href="https://cbe.ab.ca/welcome/Pages/default.aspx" fontFamily={"verdana"} variant="h6">
            The Calgary Board of Education (CBE)
          </Link>
          <br />
          <Typography variant="body" fontFamily="verdana">
            The Calgary Board of Education (CBE) is Calgary's public school
            system. The schools are welcoming, caring, respectful and safe
            environments where students will learn, make new friends, and
            discover their talents and interests.
          </Typography>
        </Paper>
        <Paper sx={{ maxWidth: 400, maxHeight:200, m: 2 }} elevation={0} xs={4}>
          <img src={Educationlanding} />
        </Paper>
      </Grid>
    </Box>
  );
};

export default withAuthenticationRequired(Education, {
  onRedirecting: () => <Loading />,
});
