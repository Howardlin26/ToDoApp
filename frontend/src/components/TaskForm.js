// src/components/TaskForm.js

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper, CircularProgress } from '@mui/material';
import { AuthContext } from '../context/AuthContext';  

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);  

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data) {
            setTitle(response.data.title || '');
            setDescription(response.data.description || '');
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching task:', error);
          setLoading(false);
        }
      };
      fetchTask();
    } else {
      setLoading(false);
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Title and Description are required');
      return;
    }

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/tasks/${id}`, { title, description }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/tasks', { title, description }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/tasks');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={6} 
        sx={{ padding: 4, mt: 4, backgroundColor: '#f0f4f8', borderRadius: '15px' }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          align="center"
          sx={{ color: '#1976d2' }}
        >
          {id ? 'Edit Task' : 'Add New Task'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              label="Task Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Task Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
          </Box>
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            fullWidth
            sx={{ padding: '10px', borderRadius: '10px', marginBottom: '10px' }}
          >
            {id ? 'Update Task' : 'Save Task'}
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            fullWidth
            onClick={() => navigate('/tasks')}
            sx={{ padding: '10px', borderRadius: '10px' }}
          >
            Back to Tasks
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default TaskForm;
