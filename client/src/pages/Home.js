import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import ManagerDashboard from '../components/ManagerDashboard';

const Home = ({ user }) => {
  const [taskRefreshKey, setTaskRefreshKey] = useState(0);

  const handleTaskCreated = () => {
    setTaskRefreshKey(prev => prev + 1); // change key to trigger re-fetch
  };

  return (
    <Container className="mt-4">
      <h2>Welcome to your Dashboard {user.username}!</h2>

      {user.role === 'manager' && (
        <>
          <Alert variant="info">You are logged in as a <strong>Manager</strong>.</Alert>
          <ManagerDashboard />
          {/*<TaskForm onTaskCreated={handleTaskCreated} />
          <TaskList key={taskRefreshKey} />*/}
          {/* Add more manager-only components here */}
        </>
      )}

      {user.role === 'worker' && (
        <Alert variant="secondary">
          You are logged in as a <strong>Worker</strong>. You can view your assigned tasks.
        </Alert>
        // Optional: TaskList with filters
      )}

      {user.role === 'admin' && (
        <Alert variant="warning">
          You are logged in as an <strong>Admin</strong>. Admin dashboard coming soon.
        </Alert>
      )}
    </Container>
  );
};

export default Home;
