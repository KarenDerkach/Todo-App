import TaskList from "../../components/TaskList";
import Link from 'next/link'
//import styles from '../styles/main.module.css'

export default function Home({ tasks }) {
  //console.log(tasks)
  return (
    <>
    <div>
      <TaskList data={tasks} />
    </div>
    <div>
     <Link href='/task/create'><a> <button>New Task</button></a></Link>
    </div>
    </>
  );
}

//reemplaza UseEffect, comunica info del back al front
export const getServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/tasks/list");
  const data = await res.json();
  //console.log(data)
  return {
    props: {
      tasks: data,
    },
  };
};

