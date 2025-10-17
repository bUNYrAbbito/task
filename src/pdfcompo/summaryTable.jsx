import React from 'react';
import './SummaryTable.css'; // Import the CSS file

const summaryData = [
  {
    category: 'Flight',
    count: 2,
    details: 'All Flights Mentioned',
    status: 'Awaiting Confirmation',
  },
  {
    category: 'Tourist Tax',
    count: 2,
    details: 'Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)',
    status: 'Awaiting Confirmation',
  },
  {
    category: 'Hotel',
    count: 2,
    details: 'Airport To Hotel - Hotel To Attractions - Day Trips If Any',
    status: 'Included',
  },
];

const SummaryTable = () => {
  const numRows = summaryData.length;

  return (
    <div className="summary-page-container">
      <h2 className="summary-title"><spam class="text-black">Inclusion </spam>Summary</h2>
      <div className="summary-table-grid">
        
        {/* Table Header */}
        <div className="table-header-row">
          <div className="header-column category-header">Category</div>
          <div className="header-column count-header">Count</div>
          <div className="header-column detail-header">Details</div>
          <div className="header-column status-header">Status / Comments</div>
        </div>
        
        {/* Table Body */}
        <div className="table-body-wrapper">
          {summaryData.map((item, index) => (
            <div key={index} className="table-data-row">
              <div 
                className={`data-cell category-cell 
                  ${index === 0 ? 'first-row-left' : ''} 
                  ${index === numRows - 1 ? 'last-row-left' : ''}`}
              >
                {item.category}
              </div>
              <div className="data-cell count-cell">
                {item.count}
              </div>
              <div className="data-cell detail-cell">
                {item.details}
              </div>
              <div 
                className={`data-cell status-cell 
                  ${index === 0 ? 'first-row-right' : ''} 
                  ${index === numRows - 1 ? 'last-row-right' : ''}`}
              >
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryTable;