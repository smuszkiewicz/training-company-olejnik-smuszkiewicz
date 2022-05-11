import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, Row } from "react-bootstrap";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    title: "Angielski",
    allDay: true,
    start: new Date(2022, 4, 11),
    end: new Date(2022, 4, 12),
  },
  {
    title: "Kurs spawania",
    start: new Date(2022, 4, 5),
    end: new Date(2022, 4, 6),
  },
  {
    title: "Wyjazd integracyjny",
    start: new Date(2022, 4, 21),
    end: new Date(2022, 4, 25),
  },
];

const Scheduler = (props) => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <Container>
      <Row className="mb-3">
        <Form.Control
          type="text"
          placeholder="Nazwa wydarzenia"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
      </Row>
      <br />
      <Row className="mb-3">
        <DatePicker
        style="flex"
          placeholderText="Data rozpoczęcia"
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
        style="flex"
          placeholderText="Data zakończenia"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
      </Row>
      <Button onClick={handleAddEvent}>Dodaj spotkanie</Button>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </Container>
  );
};

export default Scheduler;
