import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import moment from "moment";
import DatePicker from "react-datepicker";
import TranslateIcon from "@mui/icons-material/Translate";
import "react-datepicker/dist/react-datepicker.css";
import Paper from "@mui/material/Paper";
import { Col, Container, Row } from "react-bootstrap";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import CardContent from "@mui/material/CardContent";


//This
const TranslateDataLists = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [slots, setSlots] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();
  const [searchkey, setsearchkey] = useState("");
  const [fromLang, setfromLang] = useState();
  const [toLang, settoLang] = useState();
  const [bookingInfo, setBookingInfo] = useState();
  const [bookings, setBookings] = useState([]);
  const { user, isLoading } = useAuth0();
  const email = user?.email;

  useEffect(() => {
    const getTranslateList = async () => {
      try {
        const translateInfo = await fetch("/translate/getall");
        const response = await translateInfo.json();
        console.log(`translate request:`, response);
        setSlots(response);
      } catch (ex) {}
    };
    getTranslateList();
    const getBookingList = async () => {
      try {
        const bookingInfo = await fetch(
          `/bookings/${encodeURIComponent(email)}`
        );
        const response = await bookingInfo.json();
        console.log(`bookingInfo requess:`, response.bookings);
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
    } catch (error) {}
  };

  return (
    <div>
      <Typography variant= "h3" justifyContent={"center"} fontWeight={"bold"}>
        Available Translators
          </Typography>
      <Grid container>
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
              <Box sx={{ boxshadow: 3 }}>
                <Card
                  sx={{
                    display: "inline-block",
                    margin: 1,
                    // minWidth: 250,
                  }}
                  xs={11}
                  sm={5}
                  md={3}
                >
                  <CardContent>
                    <TranslateIcon
                      fontSize="large"
                      size="large"
                      sx={{ justifyContent: "flex-end" }}
                    />
                    <Typography variant="h5" color="text.primary">
                      Translate Available
                      <Typography variant="h6">
                        {new Date(slot.date).toDateString()}
                      </Typography>
                      <Typography
                        style={{ flex: 1 }}
                        variant="body2"
                        color="text.primary"
                      >
                        Volunteer Email: {slot.email}{" "}
                      </Typography>
                      <Typography>
                        Available Start Date::{" "}
                        {new Date(slot.startTime).toLocaleString("en-US", {
                          hour12: false,
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                      <Typography>
                        Available End Time::{" "}
                        {new Date(slot.endTime).toLocaleString("en-US", {
                          hour12: false,
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                      <Typography>
                        Translate From: {slot.fromLanguage}
                      </Typography>
                      <Typography>Translate To: {slot.toLanguage}</Typography>
                    </Typography>

                    <Stack direction="row" spacing={5}>
                      <Button variant="contained" onClick={handleShow}>
                        Learn More
                      </Button>
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
              </Box>
            );
          })
        ) : (
          <Typography component="div" variant="h3"></Typography>
        )}
      </Grid>
    </div>
  );
};

export default TranslateDataLists;
