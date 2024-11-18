import React, { useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Initialize the localizer
const localizer = momentLocalizer(moment);

// Wrap the calendar with drag-and-drop functionality
const DnDCalendar = withDragAndDrop(Calendar);

const App = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
    },
  ]);

  // Event handler to resize events
  const onEventResize = useCallback((data) => {
    const { start, end, event } = data;

    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((e) =>
        e.id === event.id ? { ...e, start, end } : e
      );
      return updatedEvents;
    });
  }, []);

  // Event handler to drop events
  const onEventDrop = useCallback((data) => {
    const { start, end, event } = data;

    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((e) =>
        e.id === event.id ? { ...e, start, end } : e
      );
      return updatedEvents;
    });
  }, []);

  // Handle selecting a time slot to create a new event
  const onSelectSlot = ({ start, end }) => {
    const title = window.prompt("Enter event title:", "New Event");
    if (title) {
      const newEvent = {
        id: events.length + 1,
        start,
        end,
        title,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  return (
    <div className="App">
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectSlot={onSelectSlot}
        selectable
        resizable
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default App;
