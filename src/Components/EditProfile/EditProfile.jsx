import React from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


function EditProfile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const email=user.email;

   const updateRole = async (newUserInfo) => {
        const response = await fetch(`/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserInfo),
        });
        return response.json();
      };

    let updatedInfo = {
      "isNewcomer": true,
      "isVolunteer": true,
      "isAdmin": true,
      "name": "spiderman",
    };  //Update userinformation//
    
   const handleEdit=async (e)=>{
    e.preventDefault();
    
    let newUserInfo = { email: email, ...updatedInfo };

    const updatedrole = await updateRole(newUserInfo);
   }

    return (
      <button
        className="btn btn-primary btn-block"
        onClick={handleEdit}
      >
        Edit role
      </button>
    );
}

export default EditProfile