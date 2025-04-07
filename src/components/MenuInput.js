import React from 'react';
import menuItems from '../data/menuItems';  

const MenuInput = ({ quantities, handleQuantityChange }) => {
  const categories = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-wrapper">
      {Object.keys(categories).map((categoryName) => (
        <div key={categoryName} className="menu-category">
          {/* Display the category name */}
          <h2>{categoryName}</h2>

          <div className="menu-inputs">
            {/* Left Column */}
            <div className="menu-column">
              {categories[categoryName].slice(0, Math.ceil(categories[categoryName].length / 2)).map((item) => (
                <div key={item.name} className="menu-item">
                  <label>{item.name} - Rs.{item.price}</label>
                  <input
                    type="number"
                    min="0"
                    value={quantities[item.name] || 0}
                    onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="menu-column">
              {categories[categoryName].slice(Math.ceil(categories[categoryName].length / 2)).map((item) => (
                <div key={item.name} className="menu-item">
                  <label>{item.name} - Rs.{item.price}</label>
                  <input
                    type="number"
                    min="0"
                    value={quantities[item.name] || 0}
                    onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuInput;
