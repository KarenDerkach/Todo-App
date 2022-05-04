import mongoose from "mongoose";



const  dbConnect= async()=>{
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
   // console.log(db.connection[0].readyState)
}




// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect()
//     .then(() => {
//         console.log('start');
//     })
//     .catch(err => {
//         console.error('App starting error:', err.stack);
//         process.exit(1)
//     });



// mongoose.connect(, {
//      useNewUrlParser: true, 
//      useUnifiedTopology:true
    
//     })
   


mongoose.connection.on('open', _=>{
console.log("MongoDB is Connected")
})

mongoose.connection.on('error', error =>{
  console.log(error)
})

export default dbConnect