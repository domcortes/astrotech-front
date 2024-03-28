import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteButtonComponent = ({ onClick }) => {
  return (
    <Button variant="danger" onClick={onClick}>
      Delete
    </Button>
  );
};

export default DeleteButtonComponent;
