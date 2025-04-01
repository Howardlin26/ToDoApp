// src/components/Register.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';  

const Register = () => {  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });

      alert('註冊成功！請前往登入。');
      navigate('/login');  // to home page
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('註冊失敗，請重試。');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: '15px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
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
            Register
          </Button>
        </form>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Button variant="text" color="secondary" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Typography>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" startIcon={<FaHome />} color="success">
              Home
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;

