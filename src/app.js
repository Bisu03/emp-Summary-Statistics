import express from 'express'
import mongar from "morgan"
import dotenv from "dotenv";

//  import routes
import Employee from './routes/employee.routes.js';

//  import db
import { connectDB } from './db/connectDb.js';

const app = express()
dotenv.config();

// Connect to MongoDB
connectDB()

//  middlewares
app.use(mongar("dev"))
app.use(express.json())

//  api routes
app.use("/api", Employee);

// Start the server
app.get('/', (req, res) => res.send('Hello World!'))

export default app;