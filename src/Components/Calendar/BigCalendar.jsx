import React, { useEffect, useState, useCallback, useMemo } from "react";
import {Button, Grid, Typography } from "@mui/material";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../App.css";
import apiClient from "../helpers/apiClient";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";

//This
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const apiScheduleToModel = (apiSchedule) => ({
  title: apiSchedule.task,
  start: apiSchedule.startDate,
  end: apiSchedule.endDate,
});

const apiTranslateToModel = (apiTranslate) => ({
  volunteerEmail: apiTranslate.volunteerEmail,
  newcomerEmail: apiTranslate.newcomerEmail,
  title: apiTranslate.task,
  start: apiTranslate.startTime,
  end: apiTranslate.endTime,
});

const apiBookingToModel = (apiBooking) => ({
  volunteerEmail: apiBooking.volunteerEmail,
  newcomerEmail: apiBooking.newcomerEmail,
  title: apiBooking.task + " appointment with " + apiBooking.volunteerEmail,
  start: apiBooking.startTime,
  end: apiBooking.endTime,
});

const BigCalendar = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);
  const [translateSlots, setTranslateSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth0();
  const userEmail = user?.email;
  const useName = user?.name;

  const [date, setDate] = useState([
    new Date(2021, 6, 1),
    new Date(2021, 6, 10),
  ]);

  const MyContainer = ({ className, children }) => {
    return (
      <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
        <CalendarContainer className={className}>
          <div style={{ background: "#f0f0f0" }}>
            Select an available date
          </div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  const submitToApi = useCallback(() => {
    if (newEvent.title === "") {
      return;
    }
    apiClient.post(
      "/schedule",
      JSON.stringify({
        task: newEvent.title,
        email: userEmail,
        startDate: newEvent.start,
        endDate: newEvent.end,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }, [newEvent, userEmail]);

  const handleAddEvent = () => {
    setAllEvents((prev) => [...prev, newEvent]);
    submitToApi();
    console.log("newEvents", newEvent);
  };
  console.log("submitToApi", submitToApi());

  useEffect(() => {
    if (userEmail) {
      (async () => {
        const response = await apiClient.get(
          `schedule/${encodeURIComponent(userEmail)}`
        );
        const apiSchedules = JSON.parse(response?.data ?? "");
        setAllEvents(apiSchedules.map(apiScheduleToModel));
      })();
      (async () => {
        const response = await apiClient.get(
          `translate/get/${encodeURIComponent(userEmail)}`
        );
        const apiTranslate = JSON.parse(response?.data ?? '{"translate": []}');
        setAllEvents(apiTranslate.map(apiTranslateToModel));
      })();
      (async () => {
        const response = await apiClient.get(
          `bookings/${encodeURIComponent(userEmail)}`
        );
        const data = JSON.parse(response?.data ?? '{"bookings": []}');
        setBookings(data.bookings.map(apiBookingToModel));
      })();
    }
  }, [userEmail]);

  console.log("translate", translateSlots);

  console.log("bookings", bookings);

  const calendarEntries = useMemo(
    () => [...allEvents, ...bookings],
    [allEvents, bookings]
  );
  console.log("calendarEntries", calendarEntries);

  const eventPropGetter = useCallback((event, start, end, isSelected) => {
    console.log("event", event.volunteerEmail);
    if (event.volunteerEmail) {
      return { style: { backgroundColor: "red" } };
    }

    return {};
  }, []);

  return (
    <div className="App">
      <Grid item marginBottom={1} display={"flex"} justifyContent={"center"}>
        <Typography
          variant="h6"
          component="h2"
          color="blue"
          align="center"
          pt={2}
        >
          Calendar
        </Typography>
      </Grid>
      <Grid item marginBottom={1} display={"flex"} justifyContent={"center"}>
        <Typography
          variant="h6"
          component="h2"
          color="blue"
          align="center"
          pt={1}
        >
          My Availability
        </Typography>
      </Grid>
      {/* <h1>Calendar</h1>
      <h2>My Availability</h2> */}
      <div>
        <input
          type="text"
          placeholder="Add Tasks"
          style={{marginRight: "10px" }}
          value={newEvent.task}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
          calendarContainer={MyContainer}
        />
        <DatePicker
          placeholderText="End Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
          calendarContainer={MyContainer}
        />
        {/* <button
          style={{ width: "15%", marginTop: "28px" }}
          onClick={handleAddEvent}
        >
          Submit
        </button> */}

        <Grid item display={"flex"} justifyContent={"center"}>
            <Button
              sx={{ my: 2 }}
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleAddEvent}
            >
              Submit
            </Button>
     
          </Grid>
      </div>
      <Calendar
        localizer={localizer}
        events={calendarEntries}
        selectable
        startAccessor="start"
        endAccessor="end"
        style={{height: 450, margin: "30px" }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

export default BigCalendar;
