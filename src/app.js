import express from 'express'
import mongar from "morgan"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

//  import routes
import Employee from './routes/employee.routes.js';

//  import db
import { connectDB } from './db/connectDb.js';

const app = express()
dotenv.config();

// Connect to MongoDB
connectDB()

//  middlewares
app.use(cookieParser());
app.use(mongar("dev"))
app.use(express.json())

// configure cros policy
let allowedOrigins = process.env.CLIENT_URL
app.use(
    cors({
        origin: allowedOrigins, credentials: true
    })
);


//  api routes
app.use("/api/employee", Employee);

// Start the server
app.get('/', (req, res) => res.send('Hello World!'))

export default app;