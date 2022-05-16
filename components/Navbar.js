import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function Navbar({ props }) {
  const { user, logout, login } = props;

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          {user?.length < 1 ? (
            <Button onClick={login} variant="outlined">
              Login
            </Button>
          ) : (
            <Button
              href="#"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
