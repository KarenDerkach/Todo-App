import Head from "next/head";
import styles from "../styles/main.module.css";
import Navbar from "./Navbar";

export default function Container(props) {
  return (
    <div>
      <Head>
        <title>Todo-App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Navbar props={props} />

      <main className={styles.container}>{props.children}</main>
    </div>
  );
}
