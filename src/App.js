// src/App.js

import React, { useState } from 'react';
import CustomerDetails from './components/CustomerDetails';
import MenuInput from './components/MenuInput';
import BillArea from './components/BillArea';
import TotalSummary from './components/TotalSummary';
import menuItems from './data/menuItems';
import './App.css';
import './components/MessageButton.js'
import MessageButtons from './components/MessageButton.js';

function App() {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [billNumber, setBillNumber] = useState('');
  const [quantities, setQuantities] = useState({});
  const [billText, setBillText] = useState('');

  const handleQuantityChange = (item, value) => {
    setQuantities({ ...quantities, [item]: Number(value) });
  };

  const generateBill = () => {
    const missingFields = [];
  
    if (!customerName.trim()) missingFields.push("Customer Name");
    if (!phoneNumber.trim()) missingFields.push("Phone Number");
    if (!billNumber.trim()) missingFields.push("Bill Number");
  
    if (missingFields.length > 0) {
      alert(`Please enter the following:\n- ${missingFields.join("\n- ")}`);
      return;
    }
  
    let total = 0;
    let billDetails = `Welcome Yoshops\n`;
    billDetails += `Bill Number: ${billNumber}\n`;
    billDetails += `Customer Name: ${customerName}\n`;
    billDetails += `Phone Number: ${phoneNumber}\n`;
    billDetails += `====================================================================\n`;
    billDetails += `${"S.No".padEnd(5)}${"Products".padEnd(40)}${"QTY".padEnd(10)}${"Price".padEnd(10)}\n`;
  
    let productNumber = 1; // Start numbering from 1
  
    menuItems.forEach((item) => {
      const qty = quantities[item.name] || 0;
      if (qty > 0) {
        const price = qty * item.price;
        total += price;
        
        // Breaking long product names to fit into the format
        let productName = item.name;
        const maxLength = 35; // Adjust this to fit your format
  
        // Split long product name into chunks
        let lines = [];
        while (productName.length > maxLength) {
          let spaceIndex = productName.lastIndexOf(" ", maxLength);
          if (spaceIndex === -1) {
            spaceIndex = maxLength; // If no space, cut at the maxLength
          }
          lines.push(productName.slice(0, spaceIndex).trim());
          productName = productName.slice(spaceIndex).trim();
        }
        lines.push(productName); // Add remaining part of the name if any
  
        // Add product details to bill with numbering
        lines.forEach((line, index) => {
          if (index === 0) {
            billDetails += `${String(productNumber).padEnd(5)}${line.padEnd(40)}${String(qty).padEnd(10)}${String(price).padEnd(10)}\n`;
          } else {
            billDetails += `${"".padEnd(5)}${line.padEnd(40)}${"".padEnd(10)}${"".padEnd(10)}\n`;
          }
          productNumber++; // Increment the product number for each line
        });
      }
    });
  
    billDetails += `====================================================================\n`;
    billDetails += `Total: Rs. ${total}`;
    setBillText(billDetails);
  };
  
  
  

  const saveBill = () => {
    if (!billText) {
      alert("Please generate a bill first.");
      return;
    }
  
    const element = document.createElement("a");
    const file = new Blob([billText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `bill_${billNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  

  const clearAll = () => {
    setCustomerName('');
    setPhoneNumber('');
    setBillNumber('5191');
    setQuantities({});
    setBillText('');
  };

  return (
    <div className="app-container">
      <div className="frame title-frame">
        <img src="logo.jpg" alt="Logo" className="logo" />
        <h1>Yoshops Billing Software</h1>
      </div>

      <div className="frame customer-frame">
        <CustomerDetails
          customerName={customerName}
          setCustomerName={setCustomerName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          billNumber={billNumber}
          setBillNumber={setBillNumber}
        />
      </div>

      <div className="frame menu-bill-frame">
        <div className=" menu-frame main-layout">
          <MenuInput
            quantities={quantities}
            handleQuantityChange={handleQuantityChange}
          />
        </div>
        <div className="bill-frame">
          <BillArea billText={billText} />
        </div>
      </div>
      
      <MessageButtons />

      <TotalSummary
        generateBill={generateBill}
        saveBill={saveBill}
        clearAll={clearAll}
      />

    </div>
  );
}

export default App;
