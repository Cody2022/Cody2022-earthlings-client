import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
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

const BigCalendarTest = () => {
  const [newEvent, setNewEvent] = useState({ task: "", selectDate: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);

  const submitToApi = useCallback(() => {
    if(newEvent.task === ""){
      return;
    }
    apiClient.post(
      "/volunteers/calendar",
      JSON.stringify({
        task: newEvent.task,
        selectDate: newEvent.task,
        startTime: newEvent.start,
        endTime: newEvent.end,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }, [newEvent]);

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
    submitToApi();
    console.log("newEvent", newEvent)
  }

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
          selected={newEvent.selectDate}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <TimePicker
          placeholderText="Start Time"
          style={{ width: "20%", marginRight: "20px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Time"
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

export default BigCalendarTest;
