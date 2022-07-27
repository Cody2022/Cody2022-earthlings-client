import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import VolunteerTransportForm from '../Form/VolunteerTransportForm';
import VolunteerTransportList from '../Form/VolunteerTransportList';
import { Container } from '@mui/system';
import AccommodationForm from "../Form/AccommodationForm";
import { Typography } from "@mui/material";
import VolunteerListing from "../VolunteerListing";


export const Volunteer = () => {
  const { user } = useAuth0();
  const email = user.email;
  const [accomListRender, setAccomListRender]=useState(false)


  return (
    <div >
      <AccommodationForm accomListRender={accomListRender} setAccomListRender={setAccomListRender}/>
      {/* <Typography variant='h5' sx={{m:3, display:"flex", justifyContent:"center", alignItems:"center"}}>
        Accommodations Posted by: {email}
      </Typography> */}
      <VolunteerListing accomListRender={accomListRender} setAccomListRender={setAccomListRender}/>
    </div>
  );
};

export default withAuthenticationRequired(Volunteer, {
  onRedirecting: () => <Loading />,
});
