import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as animationData from './Animation - 1735323792812.json'; // Lottie animation ka JSON file ka path

const LoginPage = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (email !== 'user@example.com' || password !== 'password') {
      setError('Invalid credentials, please try again.');
      return;
    }

    setLoggedIn(true);
    navigate('/food-selection'); // Redirect food selection page
  };

  const lottieOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData, 
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Paper sx={{ padding: 3, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <Lottie options={lottieOptions} height={150} width={150} />
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <Typography color="error" sx={{ marginTop: 1 }}>{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>Login</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
