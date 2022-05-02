require('dotenv').config();
const mongoose = require('mongoose')
const {
    
    URL_MONGODB

  } = process.env;



const connection = () =>{
    mongoose.connect(URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology:true})
   
}

mongoose.connection.on('open', _=>{
console.log("se conecto la base de datos")
})

mongoose.connection.on('error', error =>{
  console.log(error)
})

connection()