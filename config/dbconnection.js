import mongoose from "mongoose";



const  dbConnect= async()=>{
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
   // console.log(db.connection[0].readyState)
}


mongoose.connection.on('open', _=>{
console.log("MongoDB is Connected")
})

mongoose.connection.on('error', error =>{
  console.log(error)
})

export default dbConnect