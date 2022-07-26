import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Loading from "../Loading/Loading";
import TranslateFilterDate from "./TranslateFilterDate";
import TranslateFilterLists from "./TranslateFilterLists";
import TranslateDataLists from "./TranslateDataLists";

//This
const TranslateNewcomerInfo = () => {
  const [translateList, setTranslateList] = useState();
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("value:", value);
  };

  useEffect(() => {
    const getAllTranlateListings = async () => {
      try {
        let response = await fetch(`/translate/getall`);
        let allTranslateListings = await response.json();
        return setTranslateList(allTranslateListings);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTranlateListings();
  }, [value]);

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
          <TranslateFilterDate
            translateList={translateList}
            setTranslateList={setTranslateList}
          />
        </Grid>
      )}

      {value === "three" && (
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <TranslateFilterLists
            translateList={translateList}
            setTranslateList={setTranslateList}
          />
        </Grid>
      )}

      <Grid container display={"flex"} justifyContent={"center"}>
        {translateList ? (
          translateList.map((translateInfo, index) => {
            return (
              <TranslateDataLists key={index} translateInfo={translateInfo} />
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

        {translateList?.length < 1 && (
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

export default withAuthenticationRequired(TranslateNewcomerInfo, {
  onRedirecting: () => <Loading />,
});
