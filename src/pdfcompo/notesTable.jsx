import React from 'react';
import './NotesTable.css';

export default function NotesTable(props) {
  const notes = Array.isArray(props.notes) ? props.notes : [];
  if (notes.length === 0) return null;
  return (
    <div className="notes-container">
      <h2 className="notes-title"><spam class="text-black">Important </spam>Notes</h2>
      <div className="notes-table">
        <div className="table-header">
          <div className="header-column point">Point</div>
          <div className="header-column details">Details</div>
        </div>
        <div className="table-body">
          {notes.map(function (n, i) {
            return (
              <div key={i} className="table-row">
                <div className="table-cell point-cell">{n.point}</div>
                <div className="table-cell details-cell">{n.details}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}