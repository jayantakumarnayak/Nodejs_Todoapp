import  jwt  from "jsonwebtoken";
import { user } from "../models/user.js";

export const isAuthenticated=async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token)
      return res.status(404).json({
        success: false,
        message: "Login First",
      });  
    
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.User=await user.findById(decoded._id);
   next();
    
};