import React, { useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";

function EditUser() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const email = user.email;
  const [token, setToken]=useState("default");

  const handleEdit = async () => {
     const gottoken=await getAccessTokenSilently();
     console.log ("gottoken", gottoken);
     await callApi();
   }  
  
    const callApi = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log("token is:", token);
      } catch (error) {
        console.log(error)
        };
      };
    
  return (
    <div>
      <button className="btn btn-primary btn-block" onClick={handleEdit}>
        Edit User
      </button>
      <p>Token is {token}</p>
    </div>
  );
}

export default EditUser;
