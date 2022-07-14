import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import VolunteerTransportList from "../Form/VolunteerTransportList";
import VolunteerTransportForm from "../Form/VolunteerTransportForm";
import AccommodationForm from "../Form/AccommodationForm";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import VolunteerListing from "../VolunteerListing";


export const Volunteer = () => {
  const [rerender, setRerender] = useState(false);
  const { user } = useAuth0();
  const email = user.email;
  const [transportList, setTransportList] = useState();

  useEffect(() => {
    const fetchTransportListByEmail = async (email) => {
      let response = await fetch(`/transport/get/${email}`);
      let transportList = await response.json();
      return transportList;
    };
    const getTransportList = async (email) => {
      const fetchedTransportList = await fetchTransportListByEmail(email);
      setTransportList(fetchedTransportList);
    };
    getTransportList(email);
  }, [email, rerender]);

  return (
    <div style={{ background: "rgba(221, 238, 137, 0.6)" }}>
      <Container sytle={{ marginBottom: 5 }}>
        {transportList && (
          <VolunteerTransportList
            transportList={transportList}
            rerender={rerender}
            setRerender={setRerender}
          />
        )}
        <VolunteerTransportForm rerender={rerender} setRerender={setRerender} />
      </Container>
      <Typography mx={5} variant="h4">
        Accommodation Availablility Form
        </Typography>
        <AccommodationForm />
      <Typography mx={5} variant="h4">
        Accommodation Posted by: {email}
      </Typography>
      <VolunteerListing />
    </div>
  );
};

export default withAuthenticationRequired(Volunteer, {
  onRedirecting: () => <Loading />,
});
