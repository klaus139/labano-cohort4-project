"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = exports.Logout = exports.Login = exports.Register = void 0;
const app_error_1 = require("../utils/app-error");
const userModel_1 = __importDefault(require("../models/userModel"));
const validation_1 = require("../utils/validation");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, password } = req.body;
        const validate = validation_1.userRegistrationSchema.validate(req.body);
        if (validate.error) {
            return res.status(400).json({ Error: validate.error.details[0].message });
        }
        //check for the user in the database
        const oldUser = yield userModel_1.default.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ message: "user already exists please login instead" });
        }
        const salt = yield (0, utils_1.GenerateSalt)();
        const userPassword = yield (0, utils_1.GeneratePassword)(password, salt);
        const newUser = new userModel_1.default({
            firstname,
            lastname,
            email,
            salt,
            password: userPassword
        });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        res.status(201).json({ message: "user created successfully", newUser, token });
    }
    catch (error) {
        return next(new app_error_1.APIError("API Error", app_error_1.STATUS_CODES.INTERNAL_ERROR, "Error creating user", true, "", true));
    }
});
exports.Register = Register;
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validate = validation_1.userLoginSchema.validate(req.body);
        if (validate.error) {
            return res.status(400).json({ Error: validate.error.details[0].message });
        }
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const validation = yield (0, utils_1.ValidatePassword)(password, user.password, user.salt);
            if (validation) {
                user.verified = true;
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });
                // Set the 'auth_token' cookie
                res.cookie("auth_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 3600000, // 1 hour in milliseconds
                });
                return res.status(200).json({ user, token });
            }
            else {
                return res.status(401).json({ Error: "Incorrect password" });
            }
        }
        else {
            return res.status(404).json({ Error: "Admin not found" });
        }
    }
    catch (error) {
        return next(new app_error_1.APIError("API Error", app_error_1.STATUS_CODES.INTERNAL_ERROR, "Error Logging", true, "", true));
    }
});
exports.Login = Login;
const Logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("auth_token", "", {
            expires: new Date(0),
        });
        res.send();
    }
    catch (error) {
    }
});
exports.Logout = Logout;
const GetUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const user = yield userModel_1.default.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
    }
});
exports.GetUser = GetUser;
