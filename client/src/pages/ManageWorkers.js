import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

const ManageWorkers = ({ user }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshWorkers = () => setRefreshKey(prev => prev + 1);

  return (
    <Container className="mt-4">
      <h3>Worker Management</h3>
    </Container>
  );
};

export default ManageWorkers;
