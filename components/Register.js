import React, {useState} from 'react';
import {Button, CssBaseline, TextField, Link, Grid, Box,  Typography, Container,createTheme,ThemeProvider, Stack, Alert} from '@mui/material';

import {useRouter} from 'next/router'


const theme = createTheme();

export default function Register() {
const router = useRouter();

const [error, setError] = useState('');

const [newUser, setNewUser] = useState({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
})

const handleChange = (event) => {
  setNewUser({
    ...newUser,
    [event.target.name]: event.target.value
  })
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try{ 
 
   const user = await fetch('http://localhost:3000/api/auth/singUp',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  if(user.status === 201){
    router.push('/auth/singIn')
  }
  else{
    console.log(user)
    setError('Invalid email or password')
  }
 
}catch(err){
  window.alert(err)
}
  
  
};

return (
  <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                value={newUser.firstname}
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                value={newUser.lastname}
                autoComplete="family-name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={newUser.email}
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                value={newUser.password}
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {error &&<Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error"> {error}</Alert>
            </Stack>}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/singIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
);
    }