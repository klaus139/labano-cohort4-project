"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/register", authController_1.Register);
router.post("/login", authController_1.Login);
router.get("/logout", authController_1.Logout);
router.get("/me", auth_1.default, authController_1.GetUser);
router.get("/validate-token", auth_1.default, (req, res) => {
    res.status(200).json({ userId: req.userId });
});
exports.default = router;
