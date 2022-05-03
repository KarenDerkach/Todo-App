import { dbConnect } from '../../../config/dbconnection'

dbConnect()

import TaskModel from '../../../config/model'

export default   async function addTask (req, res){
    if (req.method === 'POST'){
        console.log(req.body)
        const {title, description, color} = req.body
        const task =  new TaskModel({
            title,
            description,
            color
        })
        const newTask = await task.save()
        res.status(200).json(newTask)
    } 
}