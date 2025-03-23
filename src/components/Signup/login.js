import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import animationData from './Animation - 1735323792812.json';
import { useNavigate } from 'react-router-dom';

const FoodieLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [clicks, setClicks] = useState([]); // Store click positions
  const startTimeRef = useRef(Date.now()); // Store the initial timestamp

  // Calculate time spent when component unmounts
  useEffect(() => {
    return () => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      console.log('Time Spent on Page:', timeSpent, 'seconds');
    };
  }, []);

  // Track user clicks on the page
  const handleClick = (event) => {
    const { clientX, clientY } = event;
    setClicks((prevClicks) => [...prevClicks, { x: clientX, y: clientY }]);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const form = new FormData();
      form.append('email', formData.email);
      form.append('password', formData.password);

      const response = await fetch('https://ai.myedbox.com/api/api/signin', {
        method: 'POST',
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ email: formData.email, name: data.name }));
        console.log('Login successful:', data);
        console.log('Clicks:', clicks); // Log the positions where the user clicked
        navigate('/'); // Redirect to home
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again.');
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };

  const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#ffffff' },
    animation: { width: '200px', height: '200px', marginBottom: '20px' },
    form: { display: 'flex', flexDirection: 'column', width: '100%' },
    input: { margin: '10px 0', padding: '12px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd', width: '100%', boxSizing: 'border-box' },
    button: { margin: '20px 0', padding: '12px', fontSize: '18px', color: 'white', backgroundColor: '#007bff', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    title: { color: '#333', marginBottom: '20px' },
    error: { color: 'red', marginTop: '10px' },
    forgotPassword: { marginTop: '10px', color: '#007bff', textDecoration: 'none', fontSize: '14px' },
    signUpPrompt: { marginTop: '20px', fontSize: '14px' },
    signUpLink: { color: '#007bff', textDecoration: 'none', fontWeight: 'bold' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.animation}><Lottie options={defaultOptions} /></div>
      <h1 style={styles.title}>Foodie Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.button}>Log In</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      <a href="#forgot-password" style={styles.forgotPassword}>Forgot Password?</a>
      <p style={styles.signUpPrompt}>Don't have an account? <a href="/signup" style={styles.signUpLink}>Sign Up</a></p>
    </div>
  );
};

export default FoodieLoginPage;
