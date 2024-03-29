import ErrorHandler from "../middlewares/error.js";
import bcrypt from "bcrypt";
import { user } from "../models/user.js";
import { sendCookie } from "../utils/features.js";

export const login = async (req, res, next) => {
 try {
  const { email, password } = req.body;

  const User = await user.findOne({ email }).select("+password");

  if (!User) return next(new ErrorHandler("Invalid Email or Password", 400));

  const isMatch = await bcrypt.compare(password, User.password);

  if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400));

  sendCookie(User, res, `Welcome back, ${User.name}`, 200);
 } catch (error) {
  next(error);
 }
};

export const register = async (req, res) => {
 try {
  const { name, email, password } = req.body;
  let User = await user.findOne({ email });

  if (User) return next(new ErrorHandler("User Already Exist", 400));

  const hashedPassword = await bcrypt.hash(password, 10);
  User = await user.create({ name, email, password: hashedPassword });

  sendCookie(User, res, "Registered Succesfully", 201);
 } catch (error) {
  next(error);
 }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    User: req.User,
  });
};

export const logout = (req, res) => {
   res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) ,
      sameSite:process.env.NODE_ENV==="Development"? "lax" : "none",
      secure:process.env.NODE_ENV==="Development" ? false:true,
    })
    .json({
      success: true,
      User: req.User,
    });
};
