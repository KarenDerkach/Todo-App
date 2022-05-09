import  UserModel from "../../../config/UserModel"; 
import dbConnect  from '../../../config/dbconnection'
import generateToken from '../../../config/generateToken'
import { serialize} from 'cookie'


 dbConnect()

 
export default async (req, res) => {


    const { email, password } = req.body;

   

    
try{ 
    if(req.method === 'POST'){
        
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
            //secure: process.env.NODE_ENV === 'production',
          });
          res.setHeader('Set-Cookie', serialized);



          console.log("usuario creado", userFound)

          res.json({
            ok: true,
            id: userFound._id,
            firstname: userFound.firstname,
            token,
          });

       
      }else{
        res.status(400).json({
            err: true,
            message: "Method not allowed"
        })
      }
    }
    catch(error){
      console.log(error)
    }
};
   
  