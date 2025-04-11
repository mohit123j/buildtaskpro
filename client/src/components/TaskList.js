import React from 'react';
import { Table } from 'react-bootstrap';

const TaskList = () => {
  // You can later fetch from backend here using useEffect

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
