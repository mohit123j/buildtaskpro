import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { HardHat, Construction, Hammer } from 'lucide-react';

const AppNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand onClick={() => navigate('/')} className="d-flex align-items-center gap-2"
          style={{ cursor: 'pointer' }}><Hammer size={20} /> BuildTaskPro</Navbar.Brand>
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
