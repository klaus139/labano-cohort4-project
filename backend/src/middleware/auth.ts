import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}
export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  // Check for the presence of the Authorization header
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing Token" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Attach the decoded user information to the request object
    req.userId = (decoded as JwtPayload).userId;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};

export default verifyToken;
