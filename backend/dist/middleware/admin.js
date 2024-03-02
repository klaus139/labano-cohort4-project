"use strict";
// import { Request, Response, NextFunction } from "express";
// import { Jwt, JwtPayload } from "jsonwebtoken";
// export const authorizeAdmin = (
//     req: Request // Add userId to Request type
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Check if user is an admin based on the decoded userId
//     const user:any = req.userId 
//     console.log(user)
//     if (user && user.isAdmin == true) {
//       next();
//     } else {
//       res.status(403).json({ message: "Forbidden - Not an Admin" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
