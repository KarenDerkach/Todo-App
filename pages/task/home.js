import TaskList from "../../components/TaskList";
import Error from "next/error";
//import styles from '../styles/main.module.css'

export default function Home({ tasks, error }) {
  //console.log(tasks)
  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

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
  const res = await fetch(`${process.env.NEXT_URL}/api/tasks/list`);

  if (res.status === 200) {
    const data = await res.json();
    return {
      props: {
        tasks: data,
      },
    };
  } else {
    return {
      props: {
        error: {
          statusCode: res.status,
          statusText: "You are not logged in",
        },
      },
    };
  }
};
