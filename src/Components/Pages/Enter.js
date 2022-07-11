import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import { Navigate, useNavigate } from "react-router-dom";

import Carousel from "../ImageCarousel/Carousel";

const Enter = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isNewcomer, setIsNewcomer] = useState(null);
  const [isVolunteer, setIsVolunteer] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  let email = user.email;

  useEffect(() => {
    const fetchUserRoles = async (email) => {
      let response = await fetch(`/get/${email}`);
      let userRoles = await response.json();
      setIsAdmin(userRoles.isAdmin);
      setIsNewcomer(userRoles.isNewcomer);
      setIsVolunteer(userRoles.isVolunteer);
    };
    fetchUserRoles(email);
  }, [email]);

  if (isLoading) {
    return <div>isLoading...</div>;
  }
  /*Newly registered user: direct to profile edit page*/
  if (
    isAdmin === undefined &&
    isNewcomer === undefined &&
    isVolunteer === undefined
  ) {
    return <Navigate to="/profile" />;
  }
  /*User is Admin: direct to admin page*/
  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  /*User is newcomer: direct to newcomer page*/
  if (isNewcomer && !isVolunteer) {
    return <Navigate to="/newcomer" />;
  }
  /*User is volunteer: direct to volunteer page*/
  if (!isNewcomer && isVolunteer) {
    return <Navigate to="/volunteer" />;
  }

  return (
    <div>
      <Carousel />
    </div>
  );
};

export default withAuthenticationRequired(Enter, {
  onRedirecting: () => <Loading />,
});
