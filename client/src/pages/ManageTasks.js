import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import TaskForm from '../components/TaskForm';
import TaskTable from '../components/TaskTable';

const ManageTasks = ({ user }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTasks = () => setRefreshKey(prev => prev + 1);

  return (
    <Container className="mt-4">
      <h3>Task Management</h3>
      <TaskForm onTaskCreated={refreshTasks} />
      <TaskTable key={refreshKey} onTaskUpdated={refreshTasks} />
    </Container>
  );
};

export default ManageTasks;
