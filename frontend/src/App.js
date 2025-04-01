// src/App.js

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TodoList from './components/TodoList';
import TaskForm from './components/TaskForm';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Container, Box, Typography, Button, Paper } from '@mui/material';

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Container maxWidth="lg" sx={{ 
          backgroundColor: '#f0f8ff',
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '40px'
        }}>
          <Paper elevation={6} sx={{ padding: '30px', borderRadius: '15px', width: '80%', textAlign: 'center' }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#1976d2' }}>
              Todo App
            </Typography>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tasks" element={<ProtectedRoute component={TodoList} />} />
              <Route path="/tasks/new" element={<ProtectedRoute component={TaskForm} />} />
              <Route path="/tasks/edit/:id" element={<ProtectedRoute component={TaskForm} />} />
            </Routes>
          </Paper>
        </Container>
      </Router>
    </AuthProvider>
  );
};

const Home = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Todo App
      </Typography>
      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        {!token ? (
          <>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={{ padding: '10px 20px' }}>
                Register
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="success" sx={{ padding: '10px 20px' }}>
                Login
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/tasks" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="info" sx={{ padding: '10px 20px' }}>
                Go to Tasks
              </Button>
            </Link>
            <Button 
              variant="contained" 
              color="error" 
              onClick={logout}
              sx={{ padding: '10px 20px' }}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

const ProtectedRoute = ({ component: Component }) => {
  const { token } = useContext(AuthContext);
  return token ? <Component /> : <Navigate to="/login" />;
};

export default App;
