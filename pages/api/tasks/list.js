const dbConnect = require('../../../config/dbconnection')
const  TasksModel = require('../../../config/TasksModel')

dbConnect()


export default   async (req, res)=>{
    const {method, body} = req

    switch(method){
        case 'GET':
            try{
                const allTasks = await TasksModel.find()
                res.status(200).json(allTasks)
                console.log(allTasks)
            }catch(err){
                res.status(500).json({message: err.message})
            }
            break
        case 'POST':
            try{
                const newTask = await new TasksModel(body)
                const savedTask = await newTask.save()
                res.status(201).json(savedTask)
            }catch(err){
                res.status(500).json({message: err.message})
            }
            break
        default:
            res.status(400).json({message: 'Method not allowed'})
    }
    
    
}