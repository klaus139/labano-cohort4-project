import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY as string

export const APP_SECRET = process.env.APP_SECRET as string
