import express from "express";
import verifyToken from "../middleware/auth";
import { createHotel } from "../controllers/hotelController";
//import { authorizeAdmin } from "../middleware/admin";


const router = express.Router();

router.post("/", verifyToken, createHotel);

export default router;
