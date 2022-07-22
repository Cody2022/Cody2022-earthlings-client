import React, { useEffect, useState, useCallback, useMemo } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../App.css";
import apiClient from "../helpers/apiClient";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";


let allViews = Object.keys(Views).map((k) => Views[k])

//Calendar
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
  title: apiSchedule.task + " volunteer will contact you.",
  start: apiSchedule.startDate,
  end: apiSchedule.endDate,
});

const apiBookingToModel = (apiBooking) => ({
  volunteerEmail: apiBooking.volunteerEmail,
  newcomerEmail: apiBooking.newcomerEmail,
  title: apiBooking.task + " " + apiBooking.newcomerEmail + " booked.",
  start: apiBooking.startTime,
  end: apiBooking.endTime,
});

const BigCalendar = () => {
  const [newEvent, setNewEvent] = useState({ task: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth0();
  const userEmail = user?.email;
  const useName = user?.name;

  const submitToApi = useCallback(() => {
    if (newEvent.task === "") {
      return newEvent.task === "Translator";
    }
    
    apiClient.post(
      "/schedule",
      JSON.stringify({
        task: newEvent.task,
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
          `bookings/${encodeURIComponent(userEmail)}`
        );
        const data = JSON.parse(response?.data ?? '{"bookings": []}');
        setBookings(data.bookings.map(apiBookingToModel));
      })();
    }
  }, [userEmail]);

  console.log('bookings', bookings)

  const calendarEntries = useMemo(
    () => [...allEvents, ...bookings],
    [allEvents, bookings]
  );

  console.log('calendarEntries', calendarEntries)

  const eventPropGetter = useCallback((event, start, end, isSelected) => {
    console.log('event', event.volunteerEmail)
    if (event.volunteerEmail) {
      return { style: { backgroundColor: "#F03C15" } };
    }

    return {};
  }, []);
 
  return (
    <div className="App">
      <h1>Calendar</h1>
      <h2>My Availability</h2>
      <div>
        <input
          type="text"
          placeholder="Add Tasks"
          style={{ width: "20%", marginRight: "20px" }}
          value={newEvent.task}
          onChange={(e) => setNewEvent({ ...newEvent, task: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ width: "20%", marginRight: "20px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button
          style={{ width: "15%", marginTop: "28px" }}
          onClick={handleAddEvent}
        >
          Submit
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={calendarEntries}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400, margin: "30px" }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

export default BigCalendar;

