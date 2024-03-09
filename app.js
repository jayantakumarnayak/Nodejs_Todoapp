import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import taskrouter from "./routes/task.js";
import userrouter from "./routes/user.js";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();

config({
  path:"./data/config.env"
})

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
})
);
//using routes
app.use("/api/v1/users",userrouter);
app.use("/api/v1/tasks",taskrouter);
app.get("/", (req, res) => {
  res.send("Working Nicely");
});

app.use(errorMiddleware);
