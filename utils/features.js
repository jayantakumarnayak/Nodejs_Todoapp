import jwt from "jsonwebtoken";

export const sendcookie = (User, res,message,statusCode=200) => {
  const token = jwt.sign({ _id: User._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 15 * 60,
      sameSite:process.env.NODE_ENV==="Production"? "lax" : "none",
      secure:process.env.NODE_ENV==="Production" ? false:true,
    })
    .json({
      success: true,
      message,
    });
};
