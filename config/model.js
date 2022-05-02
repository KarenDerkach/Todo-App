const mongoose = require('mongoose')

const {Schema} = mongoose

const entrieTaskSchema = new Schema({
    title : {type: String, required:true},
    description : {type:String, required:true},
    complete: { type: Boolean, default: false},
    color:{type: String},
    
})


const TaskModel = mongoose.model('tasks', entrieTaskSchema)

module.exports = TaskModel