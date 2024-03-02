import express, { Request, Response } from "express";
import { GetUser, Login, Logout, Register } from "../controllers/authController";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);

router.get("/logout", Logout)

router.get("/me", verifyToken, GetUser)

router.get("/validate-token", verifyToken, (req:Request, res:Response) => {
  res.status(200).json({ userId: req.userId })
})

export default router;
