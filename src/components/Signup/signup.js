import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography, Link } from '@mui/material';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';  // Import react-lottie
import animationData from './Animation12.json'; // Path to your Lottie JSON file

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Signup Successful!');
    }, 2000);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true, // Auto play the animation
    animationData: animationData, // The Lottie JSON data
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f9f9f9', // Light gray background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={3}
        component={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        sx={{
          width: 380,
          borderRadius: 4,
          p: 4,
          boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
          backgroundColor: '#ffffff', // Pure white background
        }}
      >
        <Typography
          variant="h4"
          align="center"
          mb={1}
          color="textPrimary"
          component={motion.h4}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Create Account
        </Typography>

        {/* Lottie Animation */}
        <Lottie options={defaultOptions} height={200} width={150} style={{ marginBottom: '20px' }} />

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                style: { color: '#333' },
              }}
              InputLabelProps={{
                style: { color: '#333' },
              }}
              sx={{ marginBottom: '15px' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                style: { color: '#333' },
              }}
              InputLabelProps={{
                style: { color: '#333' },
              }}
              sx={{ marginBottom: '15px' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              InputProps={{
                style: { color: '#333' },
              }}
              InputLabelProps={{
                style: { color: '#333' },
              }}
              sx={{ marginBottom: '25px' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: '#4CAF50', // Classic green color for the button
                color: 'white',
                fontWeight: 'bold',
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#45a049', // Darker green on hover
                },
              }}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </motion.div>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Link
                href="#"
                underline="none"
                sx={{ color: '#4CAF50', fontSize: '14px' }}
              >
                Forgot Password?
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Link
                href="/login" // Link to login page
                underline="none"
                sx={{ color: '#4CAF50', fontSize: '14px' }}
              >
                Already have an account? Login
              </Link>
            </motion.div>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUpPage;
