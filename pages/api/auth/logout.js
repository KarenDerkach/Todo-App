import UserModel from "../../../config/UserModel";
import { serialize } from "cookie";

export default async (req, res) => {
    const {  cookies } = req;

    const jwt = cookies.OurToken;

    //console.log("tokenn", jwt);

    if (!jwt) {
        return res.status(401).json({
            err: true,
            message: "You are not logged in",
        })
    }else{
        const serialized = serialize('OurToken', null, {
            maxAge: -1,
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            //secure: process.env.NODE_ENV === 'production',
          });
            res.setHeader('Set-Cookie', serialized);
            const userUpdated = await UserModel.updateOne({  isLogged: false });
            res.status(200).json({
                ok: true,
                message: "You are logged out",
                user: userUpdated
            })
    }
}