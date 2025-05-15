import React, { useState} from 'react'
import { Box, Button, Paper, TextField, Typography, Link } from '@mui/material'
import { motion } from 'framer-motion'
import Lottie from 'react-lottie'
import { useNavigate } from 'react-router-dom'
import animationData from './Animation12.json'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    const payload = new FormData();
    payload.append('name',     formData.email);
    payload.append('email',    formData.email);
    payload.append('password', formData.password);
  
    try {
      const res = await fetch('https://c602-2400-adc1-4a9-a00-47a-8f89-7a8c-c33c.ngrok-free.app/api/signup', {
        method: 'POST',
        body:    payload
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.detail || res.statusText);
      }
  
     // save email for downstream
     localStorage.setItem('userEmail', formData.email);
  
      navigate('/select-restaurants');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        minHeight: '100vh', backgroundColor: '#f9f9f9',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}
    >
      <Paper
        elevation={3}
        component={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        sx={{
          width: 380, borderRadius: 4, p: 4,
          boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
          backgroundColor: '#fff'
        }}
      >
        <Typography
          variant="h4"
          align="center" mb={2}
          component={motion.h4}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Create Account
        </Typography>

        <Lottie
          options={defaultOptions}
          height={200}
          width={150}
          style={{ marginBottom: 20 }}
        />

        {error && (
          <Typography color="error" align="center" mb={2}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Email',    name: 'email',    type: 'email',    delay: 0.5 },
            { label: 'Password', name: 'password', type: 'password', delay: 0.6 }
          ].map(({ label, name, type, delay }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay }}
            >
              <TextField
                label={label}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                required
                sx={{ marginBottom: '20px' }}
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 2, py: 1.5,
                backgroundColor: '#4CAF50',
                '&:hover': { backgroundColor: '#45a049' }
              }}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? 'Signing Up…' : 'Sign Up'}
            </Button>
          </motion.div>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Link href="#" underline="none" sx={{ fontSize: 14 }}>
              Forgot Password?
            </Link>
            <Link href="/login" underline="none" sx={{ fontSize: 14 }}>
              Already have an account? Login
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default SignUpPage
