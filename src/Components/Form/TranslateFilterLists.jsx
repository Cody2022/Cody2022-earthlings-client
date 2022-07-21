import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from "@mui/material";
import React, { useState } from "react";

const TranslateFilterLists = (props) => {
  const setTranslateList = props.setTranslateList;

  let today = new Date();
  today = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  ); //Grab Year, Month, and Day only

  const defaultTranslateInfo = {
    date: today,
    startTime: new Date().setSeconds(0, 0),
    endTime: new Date().setSeconds(0, 0),
    fromlanguage: [],
    tolanguage: [],
  };

  const [translateInfo, setTranslateInfo] = useState(defaultTranslateInfo);

  const getfromLanguages = (e) => {
    const { value, checked } = e.target;
    const { fromlanguage } = translateInfo;
    // Case 1 : The user checks the box
    if (checked) {
      setTranslateInfo({
        ...translateInfo,
        fromlanguage: [...fromlanguage, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setTranslateInfo({
        ...translateInfo,
        fromlanguage: fromlanguage.filter((e) => e !== value),
      });
    }
  };

  const gettoLanguages = (e) => {
    const { value, checked } = e.target;
    const { tolanguage } = translateInfo;
    // Case 1 : The user checks the box
    if (checked) {
      setTranslateInfo({ ...tolanguage, tolanguage: [...tolanguage, value] });
    }
    // Case 2  : The user unchecks the box
    else {
      setTranslateInfo({
        ...translateInfo,
        tolanguage: tolanguage.filter((e) => e !== value),
      });
    }
  };

  /* Search by Languages*/
  const searchfromLanguages = async (translateInfo) => {
    const response = await fetch(`/translate/getbyfromlanguages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(translateInfo),
    });
    return response.json();
  };

  /* Search by Languages*/
  const searchtoLanguages = async (translateInfo) => {
    const response = await fetch(`/translate/getbytolanguages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(translateInfo),
    });
    return response.json();
  };

  const handleSearchFromLanguages = async (event) => {
    event.preventDefault();
    try {
      const filterFromLanguages = await searchfromLanguages(translateInfo);
      console.log("Filter translate from is", filterFromLanguages);
      setTranslateList(filterFromLanguages);
    } catch (error) {
      console.log("Error in filter translate from", error.message);
    }
  };

  const handleSearchtoLanguages = async (event) => {
    event.preventDefault();
    try {
      const filterToLanguages = await searchtoLanguages(translateInfo);
      console.log("Filter translate from is", filterToLanguages);
      setTranslateList(filterToLanguages);
    } catch (error) {
      console.log("Error in filter translate from", error.message);
    }
  };

  return (
    <Grid
      container
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        marginBottom: 5,
      }}
    >
      <Grid item>
        <FormGroup row sx={{ py: 1 }}>
          <FormLabel
            sx={{ py: 2, px: 2, fontWeight: "bold", color: "black" }}
            id="demo-row-radio-buttons-group-label"
          >
            Translate From Language(s):
          </FormLabel>

          <FormControlLabel
            control={
              <Checkbox
                checked={translateInfo.fromlanguage.includes("English")}
              />
            }
            name="languages"
            label="English"
            value="English"
            onChange={getfromLanguages}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={translateInfo.fromlanguage.includes("French")}
              />
            }
            name="languages"
            value="French"
            label="French"
            onChange={getfromLanguages}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={translateInfo.fromlanguage.includes("Ukrainian")}
              />
            }
            name="languages"
            value="Ukrainian"
            label="Ukrainian"
            onChange={getfromLanguages}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={translateInfo.fromlanguage.includes("Mandarin")}
              />
            }
            name="languages"
            value="Mandarin"
            label="Mandarin"
            onChange={getfromLanguages}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={translateInfo.fromlanguage.includes("Somali")}
              />
            }
            name="languages"
            value="Somali"
            label="Somali"
            onChange={getfromLanguages}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={translateInfo.fromlanguage.includes("Other")}
              />
            }
            name="languages"
            value="Other"
            label="Other"
            onChange={getfromLanguages}
          />
        </FormGroup>

        <Grid item marginBottom={3} display="flex" justifyContent="center">
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSearchFromLanguages}
          >
            Translate from:
          </Button>

          <Grid item>
            <FormGroup row sx={{ py: 1 }}>
              <FormLabel
                sx={{ py: 2, px: 2, fontWeight: "bold", color: "black" }}
                id="demo-row-radio-buttons-group-label"
              >
                Translate To Language(s):
              </FormLabel>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={translateInfo.tolanguage.includes("English")}
                  />
                }
                name="languages"
                label="English"
                value="English"
                onChange={gettoLanguages}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={translateInfo.tolanguage.includes("French")}
                  />
                }
                name="languages"
                value="French"
                label="French"
                onChange={gettoLanguages}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={translateInfo.tolanguage.includes("Ukrainian")}
                  />
                }
                name="languages"
                value="Ukrainian"
                label="Ukrainian"
                onChange={gettoLanguages}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={translateInfo.tolanguage.includes("Mandarin")}
                  />
                }
                name="languages"
                value="Mandarin"
                label="Mandarin"
                onChange={gettoLanguages}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={translateInfo.tolanguage.includes("Somali")}
                  />
                }
                name="languages"
                value="Somali"
                label="Somali"
                onChange={gettoLanguages}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={translateInfo.tolanguages.includes("Other")}
                  />
                }
                name="languages"
                value="Other"
                label="Other"
                onChange={gettoLanguages}
              />
            </FormGroup>
          </Grid>
          <Grid item marginBottom={3} display="flex" justifyContent="center">
            <Button
              sx={{ textTransform: "capitalize" }}
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSearchtoLanguages}
            >
              Translate to
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TranslateFilterLists;
