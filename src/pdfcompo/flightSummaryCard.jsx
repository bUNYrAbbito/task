import React from 'react';
import './FlightSummary.css';

export default function FlightSummary(props) {
  const flights = Array.isArray(props.flights) ? props.flights : [];
  if (flights.length === 0) return null;
  return (
    <div className="summary-page-container">
      <h2 className="summary-title"><spam class="text-black">Flight</spam>Summary</h2>
      <div className="summary-list">
        {flights.map(function (f, i) {
          return (
            <div key={i} className="flight-row">
              <div className="flight-date-label">{f.date}</div>
              <div className="flight-info-value">{f.info}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}