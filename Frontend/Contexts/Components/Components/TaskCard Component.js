import React from 'react';
import { format } from 'date-fns';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#999';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#2196f3';
      case 'pending': return '#ff9800';
      default: return '#999';
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} className="edit-btn">Edit</button>
          <button onClick={() => onDelete(task._id)} className="delete-btn">Delete</button>
        </div>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-meta">
        <span className="priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
          {task.priority}
        </span>
        
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className="status-select"
          style={{ borderColor: getStatusColor(task.status) }}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        
        {task.dueDate && (
          <span className="due-date">
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;