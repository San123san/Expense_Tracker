import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))   //data take when fill form in the format of json
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// routes import
import userRouter  from './routes/users.routes.js'
import userExpense from './routes/expenses.routes.js'

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/expenses", userExpense)


import { errorHandler } from "./middlewares/errorHandler.js";
app.use(errorHandler); 

export {app}