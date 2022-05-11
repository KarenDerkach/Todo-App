import React , {useState}from 'react'
import {useRouter} from 'next/router';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Navbar() {

  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = async() => {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "GET"
    })
    setIsLogin(false);
  }
  
  const handleLogin = () => {
    setIsLogin(true);
    router.push('/auth/singIn');
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
            Todo App
          </Typography>
          {
            !isLogin ? 
         
            <Button onClick={handleLogin}variant="outlined">Login</Button>
         
  
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
