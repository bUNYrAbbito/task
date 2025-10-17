import React from 'react';
import './ItineraryStyles.css';

export default function ItineraryDay(props) {
  const dayNumber = props.dayNumber ? props.dayNumber : 1;
  const dateText = props.dateText ? props.dateText : '';
  const title = props.title ? props.title : '';
  const imageUrl = props.imageUrl ? props.imageUrl : 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg';
  const acts = props.activities ? props.activities : { morning: [], afternoon: [], evening: [] };

  const items = [];
  if (acts.morning && acts.morning.length > 0) {
    items.push({ time: 'Morning', details: acts.morning });
  }
  if (acts.afternoon && acts.afternoon.length > 0) {
    items.push({ time: 'Afternoon', details: acts.afternoon });
  }
  if (acts.evening && acts.evening.length > 0) {
    items.push({ time: 'Evening', details: acts.evening });
  }

  return (
    <div className="itinerary-container">
      <div className="day-sidebar">
        <span className="day-text">Day {dayNumber}</span>
      </div>
      <div className="main-content">
        <div className="header-info ">
          <div className="image-wrapper">
            <img src={imageUrl} alt={title || 'Itinerary image'} className="itinerary-image" />
          </div>
          <div className="text-info">
            <p className="date-text">{dateText}</p>
            <p className="description-text">{title}</p>
          </div>
        </div>
        <div className="timeline">
          {items.map(function (it) {
            return (
              <div key={it.time} className="timeline-item">
                <div className="timeline-line-and-dot">
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-time">{it.time}</h3>
                  <ul className="timeline-details">
                    {it.details.map(function (d, idx) {
                      return <li key={idx}>{d}</li>;
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}