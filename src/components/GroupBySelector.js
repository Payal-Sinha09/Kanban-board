import React from 'react';

const GroupBySelector = ({ setGroupBy }) => {
  const handleGroupChange = (event) => {
    setGroupBy(event.target.value);
  };

  return (
    <div>
      <label htmlFor="groupBy">Group By:</label>
      <select id="groupBy" onChange={handleGroupChange}>
        <option value="status">Status</option>
        <option value="userId">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupBySelector;
