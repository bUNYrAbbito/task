import React from 'react';
import './DetailsBlock.css'; // Import the CSS file

const detailsData = [
  { label: 'Visa Type :', value: '123456' },
  { label: 'Validity:', value: '123456' },
  { label: 'Processing Date :', value: '123456' },
];

const DetailsBlock = () => {
  return (
    <div className="details-container">
      <h2 className="details-title"><spam class="text-black">Visa </spam>Details</h2>
      <div className="info-block-wrapper">
        
        {detailsData.map((item, index) => (
          <div key={index} className="info-item">
            <div className="info-label">{item.label}</div>
            <div className="info-value">{item.value}</div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default DetailsBlock;