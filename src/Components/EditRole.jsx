import React from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


function EditRole() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const email=user.email;

   const updateRole = async (role) => {
        const response = await fetch(`/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(role),
        });
        return response.json();
      };

   const handleEdit=async (e)=>{
    e.preventDefault();
    
    let role = { email: email, isVolunteer: true, isAdmin: true };

    const updatedrole=await updateRole(role);
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

export default EditRole