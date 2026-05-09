import React from 'react';
import './TaskFilters.css';

const TaskFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      search: ''
    });
  };

  return (
    <div className="task-filters">
      <input
        type="text"
        name="search"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={handleChange}
        className="search-input"
      />
      
      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      
      <select name="priority" value={filters.priority} onChange={handleChange}>
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      
      {(filters.status || filters.priority || filters.search) && (
        <button onClick={clearFilters} className="clear-filters">
          Clear
        </button>
      )}
    </div>
  );
};

export default TaskFilters;