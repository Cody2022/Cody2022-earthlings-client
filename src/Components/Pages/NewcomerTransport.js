import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Loading from "../Loading/Loading";
import NewcomerTransportSearchByTime from "../Form/NewcomerTransportSearchByTime";
// import NewcomerTransportList from "../Form/NewcomerTransportList";
import TransportationData from "../Form/TransportationDataCard";
import NewcomerTransportSearchByLanguages from "../Form/NewcomerTransportSearchByLanguages";
import apiClient from "../helpers/apiClient";

const NewcomerTransport = () => {
  const { user } = useAuth0();
  const [transportList, setTransportList] = useState();
  const [value, setValue] = React.useState("one");
  const userEmail = user.email;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("value:", value);
  };

  useEffect(() => {
    const getAllTransportListings = async () => {
      try {
        const response = await apiClient.get(
          `/schedule/overlaps?email=${encodeURIComponent(
            userEmail
          )}&task=transport`
        );
        const data = JSON.parse(response.data ?? '{"overlaps": []}');
        return setTransportList(data.overlaps);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTransportListings();
  }, [value, userEmail]);

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: 5,
          border: 1,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="full width tabs example"
        >
          <Tab
            sx={{
              textTransform: "capitalize",
              color: "black",
              ontFamily: "Raleway",
              fontSize: "1.2rem",
            }}
            value="one"
            label="View All"
          />
          <Tab
            sx={{
              textTransform: "capitalize",
              color: "black",
              fontSize: "1.2rem",
            }}
            value="two"
            label="Search by Date and Time"
          />
          <Tab
            sx={{
              textTransform: "capitalize",
              color: "black",
              fontSize: "1.2rem",
            }}
            value="three"
            label="Search by Language"
          />
        </Tabs>
      </Box>

      {value === "two" && (
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <NewcomerTransportSearchByTime
            transportList={transportList}
            setTransportList={setTransportList}
          />
        </Grid>
      )}

      {value === "three" && (
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <NewcomerTransportSearchByLanguages
            transportList={transportList}
            setTransportList={setTransportList}
          />
        </Grid>
      )}

      <Grid container display={"flex"} justifyContent={"center"}>
        {transportList ? (
          transportList.map((transportInfo, index) => {
            return (
              <TransportationData key={index} transportInfo={transportInfo} />
            );
          })
        ) : (
          <Typography
            display={"flex"}
            justifyContent={"center"}
            color={"blue"}
            component="div"
            variant="h3"
          >
            Loading...
          </Typography>
        )}

        {transportList?.length < 1 && (
          <Typography
            component="div"
            variant="h5"
            color={"green"}
            marginBottom={"5"}
          >
            Sorry, we couldn't find any results matching your search. Try other
            time or languages please.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default withAuthenticationRequired(NewcomerTransport, {
  onRedirecting: () => <Loading />,
});
