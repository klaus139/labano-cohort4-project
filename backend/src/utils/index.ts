import { genSalt, hash } from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sign, verify } from "jsonwebtoken";
import { Request } from "express"

import { APP_SECRET } from "../config";

//Utility functions
export async function GenerateSalt() {
  return await genSalt();
}

export async function GeneratePassword(password: string, salt: string) {
  return await hash(password, salt);
}

export async function ValidatePassword(
  enteredPassword: any,
  savedPassword: any,
  salt: any
) {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
}

export async function GenerateSignature(payload: string | object | Buffer) {
  try {
    return sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const GenerateToken = async (res:any, id: any, email: string): Promise<string> => {
  const payload = {
    userId: id,
    userEmail: email,
    // Add more properties to the payload if needed
  };

  try {
    const token = jwt.sign(payload, APP_SECRET, { expiresIn: "30m" });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return token;
  } catch (error) {
    // Handle any errors during token generation
    throw new Error("Error generating token");
  }
};

export const verifyToken = async(token:string) => {
  return jwt.verify(token, APP_SECRET!) as JwtPayload;
}

export async function ValidateSignature(req:Request | any) {
  try {
    const signature:any = req.get("Authorization");
    console.log(signature);
    const payload = verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function FormateData(data: any) {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
}
