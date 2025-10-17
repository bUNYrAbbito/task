import React from 'react';
import './ScheduleTable.css'; // Import the CSS file

const tableData = [
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Nature/Sightseeing', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
  { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
];

const ScheduleTable = () => {
  return (
    <div className="schedule-page-container">
      <h2 className="schedule-title"><spam class="text-black">Activity </spam>Table</h2>
      <div className="schedule-table-grid">
        
        {/* Table Header */}
        <div className="table-header-row">
          <div className="header-column city-header">City</div>
          <div className="header-column activity-header">Activity</div>
          <div className="header-column type-header">Type</div>
          <div className="header-column time-header">Time Required</div>
        </div>
        
        {/* Table Body */}
        <div className="table-body-wrapper">
          {tableData.map((item, index) => (
            <div key={index} className="table-data-row">
              <div 
                className={`data-cell city-cell ${index === tableData.length - 1 ? 'last-row-left' : ''}`}
              >
                {item.city}
              </div>
              <div className="data-cell activity-cell">
                {item.activity}
              </div>
              <div className="data-cell type-cell">
                {item.type}
              </div>
              <div 
                className={`data-cell time-cell ${index === tableData.length - 1 ? 'last-row-right' : ''}`}
              >
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;