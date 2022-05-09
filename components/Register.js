import React, {useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, LockOutlinedIcon, Typography, Container,createTheme,ThemeProvider} from '@mui/material';
import {useRouter} from 'next/router'


const theme = createTheme();

export default function Register() {
const router = useRouter();

const [user, setUser] = useState({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
})

const handleChange = (event) => {
  setUser({
    ...user,
    [event.target.name]: event.target.value
  })
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try{ 
 
   await fetch('http://localhost:3000/api/auth/singUp',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
 router.push('/singIn')
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                value={user.firstname}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastname"
                value={user.lastname}
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
                value={user.email}
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                value={user.password}
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/singIn" variant="body2">
                <a>Already have an account? Sign in</a>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
);
    }