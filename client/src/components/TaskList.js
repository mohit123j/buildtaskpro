import React from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TaskList = () => {
  // Fetch from backend here using useEffect
  const [tasks, setTasks] = useState([]);
  
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
      }
    };

    fetchTasks();
  }, []);

  return (
    <Table striped bordered hover>
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
        {/* Static placeholder row for now */}
        <tr>
          <td>1</td>
          <td>Lay foundation</td>
          <td>John Doe</td>
          <td>Pending</td>
          <td>2025-04-30</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TaskList;
