import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import AccommodationForm from "../Form/AccommodationForm";
import AccommodationList from "../AccommodationList";
import { Typography } from "@mui/material";

export const Volunteer = () => {
  return (
    <div>
      <AccommodationForm />
      <Typography variant="h4" mx={5} my={2}> Accommodation Availability Listing </Typography>
      <AccommodationList />
    </div>
    );
};

export default withAuthenticationRequired(Volunteer, {
  onRedirecting: () => <Loading />,
});
