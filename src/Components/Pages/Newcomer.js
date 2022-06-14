import React from 'react';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";

export const Newcomer = () => {
  return (
    <div>Newcomer</div>
  )
}

export default withAuthenticationRequired(Newcomer, {
    onRedirecting: () => <Loading />,
  });;