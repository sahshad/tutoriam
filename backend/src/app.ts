import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import instructorRoutes from "./routes/instructor.routes";
import paymentRoutes from "./routes/payment.routes";
import webhookRoutes from "./routes/webhook.routes";
import reviewRoutes from "./routes/review.routes";
import orderRoutes from "./routes/order.routes";
import enrollmentRoutes from "./routes/enrollment.routes";
import certificateRoutes from "./routes/certificate.routes";
import courseRoutes from "./routes/course.routes";
import moduleRoutes from "./routes/module.routes";
import lessonRoutes from "./routes/lesson.routes";
import cartRoutes from "./routes/cart.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import categoryRoutes from "./routes/category.routes";
import chatRoutes from "./routes/chat.routes";
import messageRoutes from "./routes/message.routes";
import walletRoutes from "./routes/wallet.routes";
import transactionRoutes from "./routes/transaction.routes";
import payoutRoutes from "./routes/payout.routes";

import { errorHandler } from "./middlewares/error.middleware";
import passport from "./config/passport";

dotenv.config();
connectDB();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

app.use("/api/webhook", webhookRoutes);

app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/payouts", payoutRoutes);

app.use(errorHandler);

export default app;
