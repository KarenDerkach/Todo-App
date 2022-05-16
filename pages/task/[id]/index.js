import React from 'react'
import {server} from '../../../config'
import Error from 'next/error'
import TaskForm from '../../../components/TaskForm'

export default function TaskDetail({ data, error }) {
  if (error && error.statusCode) return <Error statusCode={error.statusCode} title={error.statusText}/>
  return (
    <div>
      <TaskForm task={data} />
    </div>
  )
}


export async function getServerSideProps({ query: { id } }) {
  //console.log(query)
  const res = await fetch(`${server}/api/tasks/${id}`);
  
  //if task exist
  if(res.status === 200){
  const data = await res.json();

  return {
    props: {data}
  }
}

  //if task not exist
  return{
    props: {
      error: {
        statusCode: res.status,
        statusText: 'Invalid ID'

      }
    }
  }
}
