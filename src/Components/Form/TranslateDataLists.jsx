import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth0 } from "@auth0/auth0-react";
import TranslateIcon from "@mui/icons-material/Translate";
import {
  Box,
  Container,
  Grid,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import apiClient from "../helpers/apiClient";
import moment from "moment";
import { makeStyles } from '@mui/styles';

const languages = ["English", "Ukrainian", "Mandarin", "Somali", "French"];
const selectStyle = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const useStyles = makeStyles({
	gridContainer: {
		paddingLeft: "20px",
		paddingRight: "40px",
	},
	
	});

const TranslateDataLists = () => {
  const [slots, setSlots] = useState([]);
  const [when, setWhen] = useState(new Date());
  const [fromLangs, setFromLangs] = useState([]);
  const [toLangs, setToLangs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth0();
  const email = user?.email;
  const classes = useStyles();

  useEffect(() => {
    if (!when || !fromLangs.length || !toLangs.length) {
      return;
    }
    const getTranslateList = async () => {
      try {
        const response = await apiClient.get("/translate/search", {
          params: { when, fromLangs, toLangs },
        });
        const data = JSON.parse(response.data);
        console.log(`search response:`, data);
        setSlots(data.results);
      } catch (ex) {}
    };
    getTranslateList();
  }, [when, fromLangs, toLangs]);

  useEffect(() => {
    const getBookingList = async () => {
      try {
        const bookingInfo = await fetch(
          `/bookings/${encodeURIComponent(email)}`
        );
        const response = await bookingInfo.json();
        setBookings(response.bookings);
      } catch (ex) {}
    };
    getBookingList();
  }, [email]);

  const createBookingInfo = async (slot) => {
    console.log(slot);
    slot.newcomerEmail = email;
    slot.volunteerEmail = slot.email;
    const response = await fetch(`/bookings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slot),
    });
    return response.json();
  };

  const handleSubmit = async (slot) => {
    try {
      const newBookingInfo = await createBookingInfo(slot);
      setBookings((prev) => [...prev, newBookingInfo]);
    } catch (error) {}
  };

  return (
    <Container maxWidth={false} sx={{backgroundColor:"#00ffdb29"}}>
      <Grid item sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h6"
          component="h2"
          color="#0033cc"
          // align="center"
          // pt={5}
        >
          Find Available Translators
        </Typography>
      </Grid>
      <br />
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
        sx={{ width: "100%", marginTop: 2, paddingBottom: 3 }}
      >
        <Grid item marginBottom={1}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={moment(when).startOf("day").toDate()}
                minDate={new Date("2018-01-01")}
                onChange={setWhen}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item marginBottom={1}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="from-langs-label">From Language(s)</InputLabel>
            <Select
              labelId="from-langs-label"
              id="from-langs"
              multiple
              value={fromLangs}
              onChange={(e) => {
                const value = e.target.value;
                const chosen =
                  typeof value === "string" ? value.split(",") : value;
                setFromLangs(chosen);
              }}
              input={<OutlinedInput label="From Language(s)" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={selectStyle}
            >
              {languages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  <Checkbox checked={fromLangs.includes(lang)} />
                  <ListItemText primary={lang} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item marginBottom={1}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="to-langs-label">To Language(s)</InputLabel>
            <Select
              labelId="to-langs-label"
              id="to-langs"
              multiple
              value={toLangs}
              onChange={(e) => {
                const value = e.target.value;
                const chosen =
                  typeof value === "string" ? value.split(",") : value;
                setToLangs(chosen);
              }}
              input={<OutlinedInput label="To Language(s)" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={selectStyle}
            >
              {languages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  <Checkbox checked={toLangs.includes(lang)} />
                  <ListItemText primary={lang} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <div style={{ display: "flex", flexDirection: "row" }}>
          {slots ? (
            slots.map((slot) => {
              const isBooked = bookings.find((b) => {
                return (
                  b.startTime === slot.startTime &&
                  b.endTime === slot.endTime &&
                  b.task === slot.task
                );
              });
              return (
                // <Grid container sx={{ flexDirection: "row" }}>
                //   <Grid
                //     items
                //     sx={{
                //       flexDirection: "row",
                //       justifyContent: "center",
                //       display: "flex",
                //     }}
                //   >
                    <Grid container spacing={2} sx={{ flexDirection: "row"}} className={classes.gridContainer}>
                      <Grid item xs={6} sm={4} md={2} sx={{minWidth:340}}>
                      <Card>
                        <CardContent>
                          <TranslateIcon
                            fontSize="large"
                            size="large"
                            sx={{ justifyContent: "center" }}
                          />
                          {/* <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold" }}
                            color="text.primary"
                          >
                            Translate Available
                          </Typography> */}
                          <Typography variant="h5" fontWeight={"bold"}>
                            {new Date(slot.date).toDateString()}
                            <Typography
                              style={{ flex: 1 }}
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                              color="text.primary"
                            >
                              Volunteer Email:{" "}
                            </Typography>
                            <Typography> {slot.email} </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Available Start Date:{" "}
                              <Typography>
                                {new Date(slot.startTime).toLocaleString(
                                  "en-US",
                                  {
                                    hour12: false,
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </Typography>
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Available End Time:{" "}
                              <Typography>
                                {new Date(slot.endTime).toLocaleString(
                                  "en-US",
                                  {
                                    hour12: false,
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </Typography>
                            </Typography>
                            {/* <Typography>
                          Translate From: {slot.fromLanguage.join(" / ")}
                        </Typography> */}
                            {/* <Typography>
                          Translate To: {slot.toLanguage.join(" / ")}
                        </Typography> */}

                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Translate From:
                            </Typography>
                            <Typography>
                              <ul style={{ marginTop: 2, marginBottom: 4 }}>
                                {slot.fromLanguage.map((language, index) => {
                                  return <li key={index}>{language}</li>;
                                })}
                              </ul>
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Translate To:
                            </Typography>
                            <Typography>
                              <ul style={{ marginTop: 2, marginBottom: 4 }}>
                                {slot.toLanguage.map((language, index) => {
                                  return <li key={index}>{language}</li>;
                                })}
                              </ul>
                            </Typography>
                          </Typography>

                          <Stack direction="row" spacing={5}>
                            {!isBooked && (
                              <Button
                                variant="contained"
                                onClick={() => handleSubmit(slot)}
                              >
                                Booking
                              </Button>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                      {/* </Box> */}
                    {/* </Grid>
                  </Grid> */}
                  </Grid>
                </Grid>
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

          {slots?.length < 1 && (
            <Typography
              component="div"
              variant="h5"
              display="block"
              color={"green"}
              marginBottom={10}
            >
              Sorry, we couldn't find any results matching your search.
              <Typography
                component="div"
                variant="h5"
                display="block"
                color={"green"}
                marginBottom={"5"}
              >
                {" "}
                Try other time or languages please.
              </Typography>
            </Typography>
          )}
        </div>
      </Grid>
    </Container>
  );
};

export default TranslateDataLists;
