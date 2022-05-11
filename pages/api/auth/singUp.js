import  UserModel from "../../../config/UserModel"; 
import dbConnect  from '../../../config/dbconnection'
//import generateToken from '../../../config/generateToken'
//import { serialize} from 'cookie'
 dbConnect()



export default async (req, res ) => {
  const { email, password, firstname, lastname } = req.body;
try{
  //verificaciones
    if(req.method === 'POST'){
    let userFound = await UserModel.findOne({ email });

    if (userFound) {
      console.log("ENTRE AQUI")
      return res.status(401).json({ 
        err: true,
        message: "This email is already in use"})
      
    }
    if(!email, !password, !firstname, !lastname){
      console.log("ENTRE AQUI 2")
     return  res.status(401).json({
        err: true,
        message: "All fields are required"
      
      })
    }
    if(password.length < 6){
      console.log("ENTRE AQUI 3")
      return res.status(401).json({
        err: true,
        message: "Password must be at least 6 characters"
      })
    }
    //fin verificaciones
    
    const userNew = await new UserModel({
      firstname,
      lastname,
      email,
      password : UserModel.encryptPassword(password),
    });
    
    const savedUser = await userNew.save();
    

    // Generar JWT
     //const token = await generateToken(savedUser._id);

     // Enviar el token al cliente
    //  const serialized = serialize('OurToken', token, {
    //   maxAge: '1h',
    //   httpOnly: true,
    //   sameSite: 'strict',
    //   path: '/',
    //   secure: process.env.NODE_ENV === 'production',
    // });
    // res.setHeader('Set-Cookie', serialized);


    return res.status(201).json({
      ok: true,
      user: savedUser,
       // token,
    });
}else{
    res.status(400).json({
        err: true,
        message: "Method not allowed"
    })
}

}
catch(err){
  res.status(500).json({
    err: true,
    message: "Error en el servidor",
    error: err
  })
}

}










// import  UserModel from "../../config/UserModel"; 
// import dbConnect  from '../../config/dbconnection'
// dbConnect()
// //userCreate

//  export default async (req, res) => {
//   try {
//     const { firstname, lastname, email, password } = req.body;

//     if(req.method === 'POST'){
//         const  user = await new UserModel({
//             firstname,
//             lastname,
//             email,
//             password
//         })
//         // encrypting password
//         user.password = await UserModel.encryptPassword(user.password);
//         // saving the new user
//         const savedUser = await user.save();
//         return res.status(200).json({
//           _id: savedUser._id,
//           firstname: savedUser.firstname,
//           lastname: savedUser.lastname,
//           email: savedUser.email,
//         });
//     }else{
//         return res.status(400).json({
//             message: 'Method not allowed'
//         })
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };