import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Task Management',
      description: 'Create, view, edit, and assign tasks to workers.',
      route: '/manage/tasks',
    },
    {
      title: 'Worker Management',
      description: 'Manage your workforce, roles, and assignments.',
      route: '/manage/workers',
    },
    {
      title: 'Equipment Management',
      description: 'Track and manage equipment availability and usage.',
      route: '/manage/equipment',
    }
  ];

  return (
    <Container className="mt-4">
      <Row xs={1} md={3} className="g-4">
        {sections.map(({ title, description, route, icon }) => (
          <Col key={route}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="primary" onClick={() => navigate(route)}>
                  Manage
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ManagerDashboard;
