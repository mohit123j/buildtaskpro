import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const TaskList = () => {
  // Fetch from backend here using useEffect
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`  // 🔐 Send token to backend
          }
        });

        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <Spinner animation="border" className="mt-4 d-block mx-auto" />;

  if (error) return <Alert variant="danger" className="mt-4 text-center">{error}</Alert>;

  return (
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task.id}>
            <td>{index + 1}</td>
            <td>{task.title}</td>
            <td>{task.assignedTo || '—'}</td>
            <td>{task.status}</td>
            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskList;
