import React from 'react';
import './ServiceTable.css';

export default function ServiceTable(props) {
  const services = Array.isArray(props.services) ? props.services : [];
  if (services.length === 0) return null;
  return (
    <div className="service-container">
      <h2 className="service-title"><spam class="text-black">Scope of </spam> Service</h2>
      <div className="service-table">
        <div className="table-header">
          <div className="header-column service">Service</div>
          <div className="header-column details">Details</div>
        </div>
        <div className="table-body">
          {services.map(function (s, i) {
            return (
              <div key={i} className="table-row">
                <div className={`table-cell service-cell ${i === services.length - 1 ? 'last-row-left' : ''}`}>{s.service}</div>
                <div className={`table-cell details-cell ${i === services.length - 1 ? 'last-row-right' : ''}`}>{s.details}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}