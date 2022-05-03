import Head from 'next/head'
import TaskForm from '../components/TaskForm'
import styles from '../styles/main.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS - Task Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Task Manager
        </h1>

       <section>
        <TaskForm/>
       </section>

      </main>
    </div>
  )
}
