import React from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading";

export const Volunteer = () => {
  return (
    <div>Volunteer</div>
  )
}

export default withAuthenticationRequired(Volunteer, {
    onRedirecting: () => <Loading />,
  });;