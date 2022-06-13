import React from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading";

export const Newcomer = () => {
  return (
    <div>Newcomer</div>
  )
}

export default withAuthenticationRequired(Newcomer, {
    onRedirecting: () => <Loading />,
  });;