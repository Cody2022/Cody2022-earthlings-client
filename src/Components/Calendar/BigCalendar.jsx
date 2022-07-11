import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../App.css";
import apiClient from "../helpers/apiClient";

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

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 6, 0),
    end: new Date(2022, 6, 0),
  }
];

function BigCalendar() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState();

  function handleAddEvent() {
    setAllEvents([...allEvents, events]);
  }

  useEffect(() => {
    apiClient.post(
      "/schedule",
      JSON.stringify({
        title: newEvent.title,
        startDate: newEvent.start,
        endDate: newEvent.end,
      }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }, [newEvent]);

  return (
    <div className="App">
      <h1>Calendar</h1>
      <h2>My Availibality</h2>
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
        <button style={{ width: "15%", marginTop: "28px" }} onClick={handleAddEvent}>
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
}

export default BigCalendar;
