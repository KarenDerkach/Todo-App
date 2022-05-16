import  UserModel from "../../../config/UserModel"; 
import dbConnect  from '../../../config/dbconnection'
import generateToken from '../../../config/generateToken'
import { serialize} from 'cookie'


 dbConnect()

 
export default async (req, res) => {

    const { method, body} = req
    const { email, password } = body;

   

    

    switch (method) {
        case "POST":
   try {
        const userFound = await UserModel.findOne({ email });
        if (!userFound) {
          return res.status(401).json({
            err: true,
            message: "User not found, please register",
          })
        }
        // Confirmar los passwords
        const validPassword = UserModel.matchPassword(password, userFound.password);
      
        if (!validPassword) {
         return  res.status(401).json({
            err: true,
            message: "Password is incorrect"
          })
          
        }
      
      
          // Generar JWT
          const token = await generateToken(userFound._id);

          const serialized = serialize('OurToken', token, {
            maxAge: 60 * 60 * 24 * 30,
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
          });
          res.setHeader('Set-Cookie', serialized);


          const userUpdated = await UserModel.findByIdAndUpdate({ _id: userFound._id.toString() }, {  isLogged: true });
          

          //console.log("usuario creado", userUpdated )

          return res.status(201).json({
            ok: true,
            id: userUpdated._id,
            firstname: userUpdated.firstname,
            token
          });
    }
    catch(error){
      console.log(error)
    }
        break;
    default:
      res.status(400).json({ message: "Method not allowed" });

  }
}
   
  