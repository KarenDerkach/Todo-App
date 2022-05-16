import {server} from '../config'
import { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Alert,
  Stack,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useRouter } from "next/router";

const theme = createTheme();

export default function Login() {
  const router = useRouter();

  const [error, setError] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataUser = await fetch(`${server}/api/auth/singIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (dataUser.status === 201) {
      router.push("/task/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={user.email}
              autoComplete="email"
              autoFocus
             
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={user.password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"

              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error"> {error}</Alert>
              </Stack>
            )}
            <Grid container>
              <Grid item>
                <Link href="/auth/singUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
