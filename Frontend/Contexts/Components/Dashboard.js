import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [socket, setSocket] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const newSocket = io('http://localhost:5000', {
      auth: { token }
    });
    
    newSocket.on('taskCreated', (task) => {
      setTasks(prev => [task, ...prev]);
    });
    
    newSocket.on('taskUpdated', (updatedTask) => {
      setTasks(prev => prev.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      ));
    });
    
    newSocket.on('taskDeleted', (taskId) => {
      setTasks(prev => prev.filter(task => task._id !== taskId));
    });
    
    setSocket(newSocket);
    
    fetchTasks();
    
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    let filtered = [...tasks];
    
    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }
    
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }
    
    if (filters.search) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    setFilteredTasks(filtered);
  }, [tasks, filters]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', taskData);
      setTasks(prev => [res.data, ...prev]);
      setShowForm(false);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, taskData);
      setTasks(prev => prev.map(task => 
        task._id === editingTask._id ? res.data : task
      ));
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
        setTasks(prev => prev.filter(task => task._id !== taskId));
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const task = tasks.find(t => t._id === taskId);
    await handleUpdateTask({ ...task, status: newStatus });
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>Task Manager</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </nav>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{stats.inProgress}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
      </div>
      
      <div className="dashboard-controls">
        <TaskFilters filters={filters} setFilters={setFilters} />
        <button onClick={() => {
          setEditingTask(null);
          setShowForm(true);
        }} className="add-task-btn">
          + Add Task
        </button>
      </div>
      
      {showForm && (
        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          initialData={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
      
      <TaskList
        tasks={filteredTasks}
        onEdit={(task) => {
          setEditingTask(task);
          setShowForm(true);
        }}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Dashboard;