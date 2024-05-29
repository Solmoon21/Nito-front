import { useState } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Grid, Link, Paper, TextField, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';

import useAuth from '../Hooks/useAuth.jsx';
import { logIn } from '../api/user_api.js';
import { useNotification } from '../Hooks/useNotification.jsx';



function LoginPage() {
  const { auth, setAuth } = useAuth();
  const { notify, NotificationTypes } = useNotification()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMerchant, setIsMerchant] = useState(false);

  const navigator = useNavigate();
  const locator = useLocation();

  const handleLogIn = async (e) => {
    e.preventDefault();

    const response = await logIn(email, password, isMerchant);
    if(!response.user){
      notify(NotificationTypes.ERROR, response.message)
      return;
    }

    setAuth({isMerchant, ...response.user});
    localStorage.setItem('nito', JSON.stringify({isMerchant, ...response.user}))
    navigator(locator.state? locator.state.from : '/');
  }

  const formStyle = {
    padding: '20px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    margin: '20px auto'
  };

  return (
      <Paper elevation={10} style={formStyle}>
          <Grid align='center'>
              <h2>Log In</h2>
          </Grid>
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} label='Email' placeholder='Enter email' fullWidth required/>
          <TextField value={password} onChange={(e) => setPassword(e.target.value)} label='Password' placeholder='Enter password' type='password' fullWidth required/>
          <FormControlLabel
              control={
              <Checkbox
                  name="isMerchant"
                  color="primary"
                  onChange={(e) => setIsMerchant(e.target.checked)}
              />
              }
              label="I am a merchant"
          />
          <Button type='submit' onClick={handleLogIn} color='primary' variant="contained" fullWidth>Sign in</Button>
          <Typography > Do not have an account?
            <Link href="#" onClick={(e) => { e.preventDefault(); navigator('/Register'); }}>Sign Up </Link>
          </Typography>
      </Paper>

  )
}

export default LoginPage