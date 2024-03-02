"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    // Check for the presence of the Authorization header
    const token = req.cookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - Missing Token" });
    }
    try {
        // Verify the token using the secret key
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attach the decoded user information to the request object
        req.userId = decoded.userId;
        // Continue to the next middleware or route handler
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
};
exports.verifyToken = verifyToken;
exports.default = exports.verifyToken;
