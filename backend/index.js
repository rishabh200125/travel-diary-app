import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import  authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"

dotenv.config()

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database is connected");     
    })
    .catch((err) => {
        console.log(err);
    })

const app = express()

app.use(cookieParser())

//for allowing json object in req body
app.use(express.json())

app.listen(3000, ()=> {
    console.log("Server is runninng on port 3000!");    
})

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500

    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})