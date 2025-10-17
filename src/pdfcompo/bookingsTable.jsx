import React from 'react';
import './BookingsTable.css';

export default function BookingsTable(props) {
  const bookings = Array.isArray(props.bookings) ? props.bookings : [];
  if (bookings.length === 0) return null;
  return (
    <div className="bookings-container">
      <h2 className="bookings-title text-black"><spam class="text-black">Hotel </spam>Booking</h2>
      <div className="bookings-table">
        <div className="table-header">
          <div className="header-column city">City</div>
          <div className="header-column check-in">Check In</div>
          <div className="header-column check-out">Check Out</div>
          <div className="header-column nights">Nights</div>
          <div className="header-column hotel-name">Hotel Name</div>
        </div>
        {bookings.map(function (b, i) {
          return (
            <div key={i} className="table-row">
              <div className="table-cell city-cell">{b.city}</div>
              <div className="table-cell check-in-cell">{b.checkIn}</div>
              <div className="table-cell check-out-cell">{b.checkOut}</div>
              <div className="table-cell nights-cell">{b.nights}</div>
              <div className="table-cell hotel-name-cell">{b.hotelName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}