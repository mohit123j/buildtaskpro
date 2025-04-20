import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const TaskTable = ({ onTaskUpdated }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [users, setUsers] = useState([]);


  const fetchTasks = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onTaskUpdated();
      setConfirmDelete(null);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    
    fetchUsers();    
    fetchTasks();
  }, []);

  if (loading) return <Spinner animation="border" className="mt-4 d-block mx-auto" />;
  const filteredTasks = tasks
  // ✅ 1. FILTERING
  .filter(task =>
    (!statusFilter || task.status === statusFilter) && // match status if selected
    (!assigneeFilter || task.assignedTo === assigneeFilter) // match user if selected
  )

  // ✅ 2. SORTING by dueDate
  .sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);

    // if sortOrder is "asc", show oldest first
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <>
      <Form className="mt-3 d-flex gap-3 flex-wrap align-items-center">
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Assigned To</Form.Label>
          <Form.Select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
          >
            <option value="">All</option>
            {users.map((u) => (
              <option key={u.id} value={u.username}>{u.username}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Sort by Due Date</Form.Label>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </Form.Select>
        </Form.Group>
      </Form>

      <Table bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((t, i) => (
            <tr key={t.id}>
              <td>{i + 1}</td>
              <td>{t.title}</td>
              <td>{t.assignedTo}</td>
              <td>{t.status}</td>
              <td>{new Date(t.dueDate).toLocaleDateString()}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2">
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => setConfirmDelete(t)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 🔐 Delete Confirmation Modal */}
      <Modal show={!!confirmDelete} onHide={() => setConfirmDelete(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete: <strong>{confirmDelete?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteTask(confirmDelete.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskTable;
