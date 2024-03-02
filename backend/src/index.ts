import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

//database
import { connectDB } from "./config/db";

//routes
import authRoutes from "./routes/auth";
import hotelRoutes from "./routes/hotel";

const app = express();

const port = process.env.PORT!;

connectDB();

//cludinary

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLODUINARY_API_SECRET,
})

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended:false }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials:true
}))

//use routes
app.use("/api/auth", authRoutes);
app.use("/api/hotel", hotelRoutes);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
