import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import moment from "moment";
import DatePicker from "react-datepicker";
import TranslateIcon from "@mui/icons-material/Translate";
import "react-datepicker/dist/react-datepicker.css";
import { MDBCol, MDBIcon } from "mdbreact";
import Paper from "@mui/material/Paper";
import { Col, Container, Row } from "react-bootstrap";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import CardContent from "@mui/material/CardContent";

const TranslateFilterLists = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [slots, setSlots] = useState();
  // const { user, isLoading } = useAuth0();
  // const email = user?.email;
  const [startDate, setStartDate] = useState(new Date());
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();
  const [duplicaterslots, setduplicaterslots] = useState([]);
  const [searchkey, setsearchkey] = useState("");
  const [fromLang, setfromLang] = useState();
  const [toLang, settoLang] = useState();
  const [bookingInfo, setBookingInfo] = useState();
  const { user, isLoading } = useAuth0();
  const email = user?.email;

//   const defaultBookingInfo = {
//     volunteerEmail: "vol222@gmail.com",
//     newcomerEmail: "new2@gmail.com",
//     startTime: "7/13/2022, 22:05",
//     endTime: "7/13/2022, 22:22"
// }


  useEffect(() => {
    const getTranslateList = async () => {
      try {
        const translateInfo = await fetch("/translate/getall");
        const response = await translateInfo.json();
        console.log(`translate requess:`, response);
        setSlots(response);
        setduplicaterslots(response);
      } catch (ex) {}
    };
    getTranslateList();
  }, []);

  function filterByDate(dates) {
    setfromDate(moment(dates[0]).format("DD-MM-YYYY"));
    settoDate(moment(dates[1]).format("DD-MM-YYYY"));
  }

  // function handleDateSelect(date) {
  //   setfromDate({ date });
  // }

  function filterfrom(e) {
    setfromLang(e);
    if (e !== "English") {
      const tempfromLang = duplicaterslots.filter((slot) =>
        slot.fromLanguage.toLowerCase().includes(searchkey.toLowerCase())
      );
      setSlots(tempfromLang);
    } else {
      setSlots(duplicaterslots);
    }
  }

  function filterTo(e) {
    settoLang(e);
    if (e !== "English") {
      const temptoLang = duplicaterslots.filter((slot) =>
        slot.toLanguage.toLowerCase().includes(searchkey.toLowerCase())
      );
      setSlots(temptoLang);
    } else {
      setSlots(duplicaterslots);
    }
  }

  const createBookingInfo = async (slot) => {
    console.log(slot)
    slot.newcomerEmail = email
    slot.volunteerEmail = slot.email
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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Grid container></Grid>
      <MDBCol md="6">
        <h1>
          <TranslateIcon />
          Search for Available Translators
        </h1>
        <Container>
          <Row>
            <Col md={4}>
              <DatePicker
                placeholderText="Search Date"
                onSelect={e=>setfromDate(e.targt.value)} 
                onChange={filterByDate} 
              />
            </Col>
            <Col md={{ span: 2, offset: 3 }}>
              <form>
                <MDBIcon icon="search" />
                <input
                  selectlanguage="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </Col>
            <Col md={{ span: 2, offset: 3 }}>
              <select
                className="form-control"
                placeholder="Translate From"
                value={duplicaterslots}
                onChange={(e) => {
                  filterfrom(e.target.value);
                }}
              >
                <option value="English">English</option>
                <option value="Ukrainian">Ukrainian</option>
                <option value="Somali">Somali</option>
                <option value="Mandarin">Mandarin</option>
              </select>
              <select
                className="form-control"
                placeholder="Translate to"
                value={duplicaterslots}
                onChange={(e) => {
                  filterTo(e.target.value);
                }}
              >
                <option value="English">English</option>
                <option value="Ukrainian">Ukrainian</option>
                <option value="Somali">Somali</option>
                <option value="Mandarin">Mandarin</option>
              </select>
            </Col>
          </Row>
        </Container>
      </MDBCol>
      {slots ? (
        slots.map((slot) => {
          return (
            <Box sx={{ boxshadow: 3, width: "100%" }}>
              
              <Card
                sx={{display:'inline-block', pl: 3, margin: 2, minWidth: 250 }}
                xs={12}
                sm={6}
                md={4}
              >
                <CardContent>
                <TranslateIcon
                fontSize="large"
                size="large"
                sx={{ display: "flex", justifyContent: "flex-end" }}
              />
                  <Typography variant="h2" color="text.primary">
                    Translate Available:!!!!!
                    <Typography sx={{fontSize: 15}}>Email: {slot.email} </Typography>
                    <Typography>Available Start Date: {slot.date}</Typography>
                    <Typography>Available Start Time: {slot.startTime}</Typography>
                    <Typography>Available End Time: {slot.endTime}</Typography>
                    <Typography>Translate From: {slot.fromLanguage[0]}</Typography>
                    <Typography>Translate To: {slot.toLanguage[0]}</Typography>
                  </Typography>

                  <Stack direction="row" spacing={5}>
                    <Button variant="contained" onClick={handleShow}>Learn More</Button>
                    <Button variant="contained" onClick={() => handleSubmit(slot)}>Booking</Button>
                  </Stack>
                  
                </CardContent>
              </Card>
            </Box>
          );
        })
      ) : (
        <Typography component="div" variant="h3"></Typography>
      )}
    </div>
  );
};

export default TranslateFilterLists;
