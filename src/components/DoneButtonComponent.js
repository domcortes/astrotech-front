import React from 'react';
import { Button } from 'react-bootstrap';

const DoneButtonComponent = ({ isDone, onClick }) => {
  return (
    <Button variant="secondary" onClick={onClick}>
      {isDone ? 'Pending' : 'Done'}
    </Button>
  );
};

export default DoneButtonComponent;
