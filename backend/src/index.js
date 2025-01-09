import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors'

import { connectDB } from './lib/db.js';

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config()
const app = express();

app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server running on port: "+ PORT)
    connectDB()
})