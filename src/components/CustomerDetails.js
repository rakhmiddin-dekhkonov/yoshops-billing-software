import React from 'react';

const CustomerDetails = ({ customerName, setCustomerName, phoneNumber, setPhoneNumber, billNumber, setBillNumber }) => {
  return (
    <div className="customer-info">
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bill Number"
        value={billNumber}
        onChange={(e) => setBillNumber(e.target.value)}
      />
    </div>
  );
};

export default CustomerDetails;
