import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const AppNavbar = ({ user, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="/">🏗️ BuildTaskPro</Navbar.Brand>
        {user && (
          <div className="d-flex align-items-center gap-3">
            <span className="text-light">Hi, {user.username}</span>
            <Button variant="outline-light" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
