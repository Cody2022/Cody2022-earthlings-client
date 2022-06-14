import React, { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../Loading';
import Profile from './Profile';
import { Newcomer } from './Newcomer';
import { Volunteer } from './Volunteer';
import { Admin } from './index';
import {useNavigate} from "react-router-dom"

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Carousel from '../ImageCarousel/Carousel';
import { color } from '@mui/system';


const Enter = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isNewcomer, setIsNewcomer] = useState(null);
  const [isVolunteer, setIsVolunteer] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate=useNavigate();

  const [role, setRole] = useState();
  const handleSelectRole = (event) => {
    setRole(event.target.value);
  };

  let email = user.email;
  console.log("user type is:", typeof user);
  console.log("user.email:", user.email);

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
  /*New user: direct to profile edit page*/
  if (
    isAdmin === undefined &&
    isNewcomer === undefined &&
    isVolunteer === undefined
  ) {
    navigate ("/profile");
  }
  /*User is Admin: direct to admin page*/
  if (isAdmin) {
    navigate("/admin");
  }
  
  /*User is newcomer: direct to newcomer page*/
  if (isNewcomer && !isVolunteer) {
    navigate("/newcomer");
  }
  /*User is volunteer: direct to volunteer page*/
  if (!isNewcomer && isVolunteer) {
    navigate("/volunteer");
  }

  /*User has two roles, i.e., volunteer and newcomer: Select role first then direct to the corresponding page*/
  if (isNewcomer && isVolunteer) {
    return (
      <div>
        {!role && (
          <div style={{ backgroundColor: "lightskyblue" }}>
            <FormControl style={{ display: "flex", textAlign: "center" }}>
              <FormLabel
                id="controlled-radio-buttons-group"
                style={{ fontweight: "bold", color: "yellow" }}
              >
                Select your role please!
              </FormLabel>
              <RadioGroup
                sx={{ position: "relative", left: "45%" }}
                row
                aria-labelledby="controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={role}
                onChange={handleSelectRole}
              >
                <FormControlLabel
                  value="newcomer"
                  control={<Radio />}
                  label="Newcomer"
                />
                <FormControlLabel
                  value="volunteer"
                  control={<Radio />}
                  label="Volunteer"
                />
              </RadioGroup>
            </FormControl>
            <Carousel />
          </div>
        )}

        {role && role === "newcomer" && navigate("/newcomer")}
        {role && role === "volunteer" && navigate("/volunteer")}
      </div>
    );
  }
};

export default withAuthenticationRequired(Enter, {
    onRedirecting: () => <Loading />,
  });;