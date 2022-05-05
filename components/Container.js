import Head from 'next/head'
//import Navigation from "./navigation";
import styles from '../styles/main.module.css'

export default function Container (props) { 
    return(

  <div className={styles.container}>
       <Head>
        <title>Next JS - Task Manager</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet"></link>
<link   rel="stylesheet"   href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>
    
    <main >{props.children}</main>
  </div>
    )
};