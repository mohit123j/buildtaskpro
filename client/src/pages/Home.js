import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import TaskList from '../components/TaskList';

const Home = ({ user }) => {
  return (
    <Container className="mt-4">
      <h2>Welcome, {user.username}</h2>

      {user.role === 'manager' && (
        <>
          <Alert variant="info">You are logged in as a <strong>Manager</strong>.</Alert>
          <TaskList />
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
