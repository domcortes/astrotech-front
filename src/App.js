import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';


function App() {
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line 
  }, []);

  const fetchTodos = () => {
    axios.get(`${API_BASE_URL}`)
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      axios.post(`${API_BASE_URL}`, { task_name: newTodo, done: false })
        .then(response => {
          fetchTodos();
          setNewTodo('');
        })
        .catch(error => {
          console.error('Error creating todo:', error);
        });
    }
  };

  const toggleTodoStatus = (id, currentState) => {
    const newDoneState = currentState === 1 ? false : true;

    axios.put(`${API_BASE_URL}/index.php?id=${id}`, { done: newDoneState })
      .then(response => {
        fetchTodos();
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_BASE_URL}/index.php?id=${id}`)
      .then(response => {
        fetchTodos();
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <Container>
      <h1 className="mt-3">Lista de Tareas</h1>
      <Form onSubmit={handleFormSubmit} className="mb-3">
        <Form.Group controlId="formTodo">
          <Form.Control type="text" placeholder="Ingrese una nueva tarea" value={newTodo} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Agregar Tarea
        </Button>
      </Form>
      <ListGroup>
        {todos.map(todo => (
          <ListGroup.Item key={todo.id}>
            <span style={{ textDecoration: todo.done == 0 ? 'none' : 'line-through' }}>
              {todo.task_name}
            </span>
            <Button variant="secondary" className="ms-2" onClick={() => toggleTodoStatus(todo.id, todo.done)}>
              {todo.done == 0 ? 'Mark as done' : 'Mark as pending'} {todo.done}
            </Button>
            <Button variant="danger" className="ms-2" onClick={() => deleteTodo(todo.id)}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default App;