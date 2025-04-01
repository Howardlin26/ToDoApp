// src/components/TodoList.js

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Box, List, ListItem, ListItemText, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../context/AuthContext'; // AuthContext

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // take token from Context API

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (token) fetchTasks(); // ensure token esist then send request
  }, [token]);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task._id !== taskId));  // delete task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Your Tasks
        </Typography>
        
        <Box mb={3} display="flex" justifyContent="space-between">
          <Link to="/tasks/new" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              Add New Task
            </Button>
          </Link>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>

        <List>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    component={Link}
                    to={`/tasks/edit/${task._id}`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(task._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
              sx={{ marginBottom: 2, borderBottom: '1px solid #ddd' }}
            >
              <ListItemText
                primary={<Typography variant="h6">{task.title}</Typography>}
                secondary={task.description}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TodoList;
