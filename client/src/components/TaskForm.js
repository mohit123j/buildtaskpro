import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    status: 'Pending'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!formData.title.trim()) {
        return setError('Task title is required.');
      }
      
      if (!formData.dueDate) {
        return setError('Please select a due date.');
      }

      const res = await axios.post('http://localhost:5000/api/tasks', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess('Task created successfully!');
      setFormData({ title: '', description: '', assignedTo: '', dueDate: '', status: 'Pending' });

      // Let parent refresh task list
      if (onTaskCreated) onTaskCreated();

    } catch (err) {
      console.error('Error creating task:', err);
      setError('Failed to create task. Please try again.');
    }
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <h5>Create New Task</h5>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={2}
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assigned To</Form.Label>
            {loadingUsers ? (
    <Spinner size="sm" animation="border" />
  ) : (
    <Form.Select
      name="assignedTo"
      value={formData.assignedTo}
      onChange={handleChange}
    >
      <option value="">-- Select Worker --</option>
      {users.map(user => (
        <option key={user.id} value={user.username}>{user.username}</option>
      ))}
    </Form.Select>
  )}
          </Form.Group>
          <Form.Group className="mb-3">
  <Form.Label>Status</Form.Label>
  <Form.Select
    name="status"
    value={formData.status}
    onChange={handleChange}
    required
  >
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </Form.Select>
</Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary">Create Task</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TaskForm;
