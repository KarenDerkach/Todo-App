import Link from "next/link";
import React from "react";
import Button from "@mui/material/Button";

export default function Landing() {
  return (
    <>
      <h1>Welcome to Task Manager</h1>
      <div>
        <Link href="/singIn">
          <a>
            <Button>Login</Button>
          </a>
        </Link>
        <Link href="/singUp">
          <a>
            <Button>Register</Button>
          </a>
        </Link>
      </div>
    </>
  );
}
