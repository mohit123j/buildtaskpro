import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Page Not Found</p>
      <p>The page you're looking for doesn't exist.</p>

      <Button variant="primary" onClick={() => navigate('/home')}>
        Back to Home
      </Button>
    </Container>
  );
};

export default NotFound;
