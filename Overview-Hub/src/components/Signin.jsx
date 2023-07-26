import React, { useState , useContext } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { server } from '../utils/apiRoutes';
import { AuthContext } from '../context/AuthContext';
import { setUserSession } from '../utils/SessionManager';
const SigninPage = () => {

  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSignup = () => {
    window.location.href = '/signup';
  };

  const handleSignin = async () => {
    try {
      const response = await fetch(`${server}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json();
        const { username, isAdmin } = data;
        const user = { username: username, isAdmin: isAdmin };
        const admin = isAdmin?'true':'';
        
        login(username , isAdmin);//context management
        setUserSession(user);//session management

        console.log('login successful. username = '+username + " password " +password );
      } else {
        console.error('Error:', response.status);
      }

    } catch (error) {
      console.error('Error:', error);
    }
    setUsername('');
    setPassword('');
  };
  

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6} lg={4}>
        <div style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Signin Page
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
          <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleSignin}>
              Sign In
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{
                '&:hover': {
                  backgroundColor: 'green', // Set the desired color on hover
                },
              }}
              onClick={handleSignup}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default SigninPage;
