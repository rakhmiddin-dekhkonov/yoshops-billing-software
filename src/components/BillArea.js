import React from 'react';

const BillArea = ({ billText }) => {
  return (
    <div>
      <h2 className='bill-area-text'>Bill Area</h2>
      <textarea
        className="bill-area"
        rows="15"
        value={billText}
        readOnly
      />
    </div>
  );
};

export default BillArea;
