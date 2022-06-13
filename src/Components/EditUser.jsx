import React from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";


function EditUser() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const email=user.email;

  
    
   const handleEdit=async (e)=>{
    e.preventDefault();
      var options = {
        method: "POST",
        url: "https://dev-84cqedli.us.auth0.com/oauth/token",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: {
          grant_type: "authorization_code",
          client_id: "yUE4rjxiH13ctRHY2BSuLWLZheoxe8wm",
          client_secret:
            "ikeXsiJcB6DumuVatHHLodunhKRZm03oTRfb2btdDbgmEFxWIn4BVfm-g5ru1Ts7",
          audience: "https://dev-84cqedli.us.auth0.com/api/v2/",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
   }

    return (
      <button
        className="btn btn-primary btn-block"
        onClick={handleEdit}
      >
        Edit User
      </button>
    );
}

export default EditUser