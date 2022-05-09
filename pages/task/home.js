import TaskList from "../../components/TaskList";
import { useState } from "react";
//import styles from '../styles/main.module.css'

export default function Home({ tasks }) {
  //console.log(tasks)

  
  return (
    <>
    <div>
      <TaskList data={tasks} />
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

