import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ filters, onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (value) => {
    setActiveFilter(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  return (
    <div className="filter-container">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`filter-button ${activeFilter === filter.value ? 'active' : ''}`}
          onClick={() => handleFilterClick(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;