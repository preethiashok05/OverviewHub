import React, { useState } from 'react';
import { Button, Grid, TextField, Typography, Checkbox } from '@mui/material';
import { server } from '../utils/apiRoutes';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State variable for isAdmin checkbox

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleIsAdminChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  const handleSignup = () => {
    // Perform validation on the entered data
    if (!username || !password) {
      console.log('Username and password are required');
      return;
    }

    // Send the sign-up request to the backend
    fetch(`${server}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, isAdmin }), // Include isAdmin in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Sign-up successful');
      })
      .catch((error) => {
        console.log('Sign-up error:', error);
      });

    // Clear input fields after sign-up
    setUsername('');
    setPassword('');
    setIsAdmin(false);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6} lg={4}>
        <div style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <TextField
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <Checkbox // Checkbox for isAdmin
            checked={isAdmin}
            onChange={handleIsAdminChange}
            color="secondary"
          />
          <Typography variant="body1">Is Admin</Typography>
          <Button variant="contained" color="secondary" onClick={handleSignup}>
            Sign Up
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
