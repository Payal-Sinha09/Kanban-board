import React from 'react';

const SortOrderSelector = ({ setSortOrder }) => {
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div>
      <label htmlFor="sortOrder">Sort By:</label>
      <select id="sortOrder" onChange={handleSortChange}>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default SortOrderSelector;
