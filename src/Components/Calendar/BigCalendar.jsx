import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";
import apiClient from "../helpers/apiClient";
import { useAuth0 } from "@auth0/auth0-react";

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
  title: apiSchedule.title,
  start: apiSchedule.startDate,
  end: apiSchedule.endDate,
});

const BigCalendar = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);
  const { user } = useAuth0();
  const userEmail = user?.email;

  const submitToApi = useCallback(() => {
    if (newEvent.title === "") {
      return;
    }
    apiClient.post(
      "/schedule",
      JSON.stringify({
        title: newEvent.title,
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
    if (user) {
      (async () => {
        const response = await apiClient.get(
          `schedule/${encodeURIComponent(user.email)}`
        );
        const apiSchedules = JSON.parse(response?.data ?? '');
        setAllEvents(apiSchedules.map(apiScheduleToModel));
      })();
    }
  }, [user]);

  // console.log(`allEvent ${allEvents}`);

  return (
    <div className="App">
      <h1>Calendar</h1>
      <h2>My Availability</h2>
      <div>
        <input
          type="text"
          placeholder="Add Tasks"
          style={{ width: "20%", marginRight: "20px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
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
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400, margin: "30px" }}
      />
    </div>
  );
};

export default BigCalendar;
