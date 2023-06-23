import express from "express"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"


config({
    path: "./data/config.env"
})

export const app = express();


app.use(express.json())  // Middleware for accessing json data in body
app.use(cookieParser()) // Middleware for accessing cookie data in body

//Using routers
app.use("/api/v1/users",userRouter)  // "/api/v1/users" this will get added to all the routes in userRouter as prefix
app.use("/api/v1/tasks",taskRouter) 

app.get('/', (req, res) => {
    res.send("Nice Working")
})

app.use(errorMiddleware)  // Using error middleware

app.use(cors({
    origin:process.env.FRONTEND_URL,  // it will allow request only from these URLs
    methods:['GET', 'PUT', 'DELETE','POST'],  // it will allow only these requests
    credentials : true // allows headers to reach frontend (e.g allows cookies to reach frondend)

}))
