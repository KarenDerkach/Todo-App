import React , {useState}from 'react'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Navbar() {

  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = async() => {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "GET"
    })
    setIsLogin(false);
  }

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link href='/task/home'><a>Todo App</a></Link>
          </Typography>
          {
            !isLogin ? 
          <Link href="/singIn">
          <a>
            <Button variant="outlined">Login</Button>
          </a>
        </Link>
        :
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={handleLogout}>
            Logout
          </Button>
        
          }

        </Toolbar>
      </AppBar>
    </>
  )
}
