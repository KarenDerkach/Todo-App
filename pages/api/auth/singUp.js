import UserModel from "../../../config/UserModel";
import dbConnect from "../../../config/dbconnection";
dbConnect();

export default async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  switch (req.method) {
    case "POST":
      try {
        let userFound = await UserModel.findOne({ email });

        if (userFound) {
          return res.status(401).json({
            err: true,
            message: "This email is already in use",
          });
        }
        if ((!email, !password, !firstname, !lastname)) {
          return res.status(401).json({
            err: true,
            message: "All fields are required",
          });
        }
        if (password.length < 6) {
          return res.status(401).json({
            err: true,
            message: "Password must be at least 6 characters",
          });
        }
        //fin verificaciones

        const userNew = await new UserModel({
          firstname,
          lastname,
          email,
          password: UserModel.encryptPassword(password),
        });

        const savedUser = await userNew.save();

        return res.status(201).json({
          ok: true,
          user: savedUser,
        });
      } catch (err) {
        console.log(err);
      }
      break;
    case "GET":
      try {
        const allUser = await UserModel.find({ isLogged: true });
        // console.log("usuarios encontrados", allUser)
        if (!allUser)
          return res.status(404).json({ message: "Users not found" });
        return res.status(200).json(allUser);
      } catch (err) {
        console.log(err);
      }
      break;
    default:
      res.status(400).json({ message: "Method not allowed" });
  }
};
