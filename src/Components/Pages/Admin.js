import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";

const Admin = () => {
  return (
    <div>Admin page</div>
  )
}

export default withAuthenticationRequired(Admin, {
    onRedirecting: () => <Loading />,
  });;