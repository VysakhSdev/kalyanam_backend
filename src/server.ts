import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import packageRoutes from "./routes/packageRoute";
import authRoutes from "./routes/authRoutes";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
