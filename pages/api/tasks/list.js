// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { dbConnect } from '../../../config/dbconnection'

dbConnect()

import TaskModel from '../../../config/model'

//import { tasks } from './_tasks'



export default  function getTask(req, res) {
  res.status(200).json("tasks")

  // if(req.method === 'GET'){
  //   const tasks = await TaskModel.find()
  //   tasks? res.status(200).json(tasks) : res.status(404).json({message: 'No tasks found'})
   

  // }
  
}
