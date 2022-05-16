import { useEffect, useState } from "react";
import {server} from '../config'
import { useRouter } from "next/router";
import Container from "../components/Container";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [user, setUser] = useState([]);

  //console.log("usuarios de ruta singUp", user)

  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = async () => {
    await fetch(`${server}/api/auth/logout`, {
      method: "GET",
    });
    setIsLogin(false);
    router.push("/");
  };
  const handleLogin = () => {
    setIsLogin(true);
    router.push("/auth/singIn");
  };

  useEffect(() => {
    const fetchGetUser = async () => {
      const res = await fetch(`${server}/api/auth/singUp`);
      const data = await res.json();
      setUser(data);
    };
    fetchGetUser();
  }, [user]);

  return (
    <Container
      user={user}
      isLogin={isLogin}
      logout={handleLogout}
      login={handleLogin}
    >
      <Component {...pageProps} />
    </Container>
  );
}
