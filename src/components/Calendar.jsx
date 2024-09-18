import React from "react";
import { Calendar } from "./ui/calendar.jsx";
import HotelBookings from './ui/Bookings.jsx';  // Importing correctly

function Calendar1() {
  return (
    <div className="App">
      <HotelBookings /> {/* Corrected component usage */}
    </div>
  );
}

export default Calendar1;
