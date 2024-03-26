import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';


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
    const newDoneState = currentState == 1 ? false : true;

    axios.put(`${API_BASE_URL}/index.php?id=${id}`, { done: newDoneState })
      .then(response => {
        fetchTodos();
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  const deleteTodo = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You can not revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_BASE_URL}/index.php?id=${id}`)
          .then(response => {
            fetchTodos();
            Swal.fire(
              'Deleted!',
              'The task has been deleted.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error deleting todo:', error);
            Swal.fire(
              'Error',
              'There were a problem trying to delete this task.',
              'error'
            );
          });
      }
    });
  };


  return (
    <Container>
      <h1 className="mt-3">To Do List</h1>
      <Form onSubmit={handleFormSubmit} className="mb-3">
        <Form.Group controlId="formTodo" className="d-flex">
          <Form.Control type="text" placeholder="Create a new task" value={newTodo} onChange={handleInputChange} className="mr-2" />
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {todos.map(todo => {
          let isDone = todo.done == 1 ? true : false;
          return (
            <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
              <span style={{ textDecoration: isDone ? 'line-through' : 'none' }}>
                {todo.task_name}
              </span>
              <div className="btn-group" role="group" aria-label="Acciones">
                <Button variant="secondary" onClick={() => toggleTodoStatus(todo.id, isDone)}>
                  {isDone ? 'Pending' : 'Done'}
                </Button>
                <Button variant="danger" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
}

export default App;