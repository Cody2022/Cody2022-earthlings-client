import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccomData from "./Form/AccomData";
import Loading from "./Loading/Loading";

const AccommodationList = () => {
  const { user, isLoading } = useAuth0();
  const email = user?.email;
  console.log("user is", email);
  const [accomList, setAccomList] = useState();

  useEffect(() => {
    const getAccomList = async () => {
      try {
        const response = await fetch(
          `/schedule/overlaps?email=${encodeURIComponent(
            email
          )}&task=accommodation`
        );
        const data = await response.json();
        console.log("accomList is", data);
        return setAccomList(data.overlaps);
      } catch (ex) {
        console.log(ex);
      }
    };
    getAccomList();
  }, [email]);

  return (
    <Grid container>
      {accomList ? (
        accomList.map((accomInfo, index) => {
          return (
            <Grid xs={12} sm={6} md={3} item>
              <AccomData accomInfo={accomInfo} />
            </Grid>
          );
        })
      ) : (
        <Typography component="div" variant="h3">
          Loading...
        </Typography>
      )}
    </Grid>
  );
};

export default withAuthenticationRequired(AccommodationList, {
  onRedirecting: () => <Loading />,
});
