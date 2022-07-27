import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Loading from "../Loading/Loading";
import AccomSearchByMaxNumTenants from "../Form/AccomSearchByMaxNumTenants";
import AccomSearchByNumberOfRooms from "../Form/AccomSearchByNumberOfRooms";
import AccomSearchByLocation from "../Form/AccomSearchByLocation";
import AccomData from "../Form/AccomData";

const NewcomerAccommodation = () => {
  const [accomList, setAccomList] = useState();
  const [value, setValue] = useState("one");
  const [filteredAccomList, setFilteredAccomList] = useState();
  const [numberOfRoomsFilter, setNumberOfRoomsFilter] = useState();
  const [maxNumTenantsFilter, setMaxNumTenantsFilter] = useState();
  const [accomLocationFilter, setAccomLocationFilter] = useState();
  const { user } = useAuth0();
  const email = user?.email;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("newValue:", newValue);
  };

  useEffect(() => {
    if (accomList) {
      let filteredAccoms = accomList.slice();
      if (numberOfRoomsFilter) {
        filteredAccoms = filteredAccoms.filter((accom) => {
          let numberOfRooms = accom.numberOfRooms;
          return numberOfRoomsFilter == numberOfRooms;
        });
      }
      setFilteredAccomList(filteredAccoms);
    }
  }, [numberOfRoomsFilter, accomList]);

  useEffect(() => {
    if (accomList) {
      let filteredAccoms = accomList.slice();
      if (maxNumTenantsFilter) {
        filteredAccoms = filteredAccoms.filter((accom) => {
          let maxNumTenants = accom.maxNumTenants;
          return maxNumTenantsFilter == maxNumTenants;
        });
      }
      setFilteredAccomList(filteredAccoms);
    }
  }, [maxNumTenantsFilter, accomList]);

  useEffect(() => {
    if (accomList) {
      let filteredAccoms = accomList.slice();
      if (accomLocationFilter) {
        filteredAccoms = filteredAccoms.filter((accom) => {
          let location = accom.location;
          return accomLocationFilter == location;
        });
      }
      setFilteredAccomList(filteredAccoms);
    }
  }, [accomLocationFilter, accomList]);

  useEffect(() => {
    const getAllAccomList = async () => {
      try {
        let response = await fetch(`/accommodation/listings`);
        let allAccomLists = await response.json();
        console.log("allAccomList is", allAccomLists);
        return setAccomList(allAccomLists);
      } catch (ex) {
        console.log(ex);
      }
    };
    getAllAccomList();
  }, [value]);

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: 3,
          border: 2,
          borderRadius:3,
          borderColor:"blue"
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
              fontFamily: "Raleway",
              fontSize: "1.3rem",
            }}
            value="one"
            label="View Accommodations"
          />
          <Tab
            sx={{
              textTransform: "capitalize",
              color: "black",
              fontFamily: "Raleway",
              fontSize: "1.3rem",
            }}
            value="two"
            label="Search by Num of Rooms"
          />
          <Tab
            sx={{
              textTransform: "capitalize",
              color: "black",
              fontFamily: "Raleway",
              fontSize: "1.3rem",
            }}
            value="three"
            label="Search by Max Num of Tenants"
          />
          <Tab
            sx={{
              textTransform: "capitalize",
              color: "black",
              fontFamily: "Raleway",
              fontSize: "1.3rem",
            }}
            value="four"
            label="Search by Location"
          />
        </Tabs>
      </Box>

      {value === "two" && (
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <AccomSearchByNumberOfRooms
            numberOfRoomsFilter={numberOfRoomsFilter}
            setNumberOfRoomsFilter={setNumberOfRoomsFilter}
          />
        </Grid>
      )}
      {value === "three" && (
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <AccomSearchByMaxNumTenants
            maxNumTenantsFilter={maxNumTenantsFilter}
            setMaxNumTenantsFilter={setMaxNumTenantsFilter}
          />
        </Grid>
      )}
      {value === "four" && (
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <AccomSearchByLocation
            accomLocationFilter={accomLocationFilter}
            setAccomLocationFilter={setAccomLocationFilter}
          />
        </Grid>
      )}

      <Grid container display={"flex"} justifyContent={"center"}>
        {filteredAccomList ? (
          filteredAccomList.map((accomInfo, index) => {
            return <AccomData key={index} accomInfo={accomInfo} />;
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

        {filteredAccomList?.length < 1 && (
          <Typography
            component="div"
            variant="h5"
            color={"green"}
            marginBottom={"5"}
          >
            Sorry, we couldn't find any results matching your search. Try other
            number of rooms or max number of tenants please.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default withAuthenticationRequired(NewcomerAccommodation, {
  onRedirecting: () => <Loading />,
});
