import "reflect-metadata"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import connectDB  from "./config/db";
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'
import instructorRoutes from './routes/instructorRoutes'
import paymentRoutes from './routes/paymentRoutes'
import webhookRoutes from './routes/webhookRoutes'
import reviewRoutes from './routes/review.routes'
import { errorHandler } from "./middlewares/errorMiddleware";
import passport from "./config/passport";

dotenv.config();
connectDB();


const app = express();
const CLIENT_URL = process.env.CLIENT_URL

app.use("/api/webhook", webhookRoutes)

app.use(passport.initialize())
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: CLIENT_URL, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true 
}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/instructor",instructorRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/reviews", reviewRoutes)

app.use(errorHandler)

export default app;
