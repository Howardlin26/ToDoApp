// src/components/Login.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';  

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

      if (response.data.token) {
        login(response.data.token);  
        navigate('/tasks');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: '15px' }}>
        
        {/* Home Button */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" startIcon={<FaHome />} color="success">
              Home
            </Button>
          </Link>
        </Box>
        
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
            Login
          </Button>
        </form>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Button variant="text" color="secondary" onClick={() => navigate('/register')}>
              Register
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
