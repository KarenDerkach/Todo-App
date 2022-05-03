require('dotenv').config();
const mongoose = require('mongoose')
// const {
    
//     URL_MONGODB

//   } = process.env;
const uri = "mongodb+srv://todo_app:AA3E6JcQIpn6CFg0@cluster0.hc8pi.mongodb.net/task?retryWrites=true&w=majority";

const conn ={
  isConnected: false,
}

const  dbConnect= async()=>{
    const db = await mongoose.connect (uri, {useNewUrlParser: true, useUnifiedTopology: true})
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

module.exports = dbConnect