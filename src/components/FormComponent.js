import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';

const FormComponent = ({ onSubmit, newTodo, handleInputChange }) => {
  return (
    <Form onSubmit={onSubmit} className="mb-3">
      <Form.Group controlId="formTodo" className="d-flex">
        <FormControl
          type="text"
          placeholder="Create a new task"
          value={newTodo}
          onChange={handleInputChange}
          className="mr-2"
        />
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form.Group>
    </Form>
  );
};

export default FormComponent;
