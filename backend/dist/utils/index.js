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
exports.FormateData = exports.ValidateSignature = exports.verifyToken = exports.GenerateToken = exports.GenerateSignature = exports.ValidatePassword = exports.GeneratePassword = exports.GenerateSalt = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jsonwebtoken_2 = require("jsonwebtoken");
const config_1 = require("../config");
//Utility functions
function GenerateSalt() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcryptjs_1.genSalt)();
    });
}
exports.GenerateSalt = GenerateSalt;
function GeneratePassword(password, salt) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcryptjs_1.hash)(password, salt);
    });
}
exports.GeneratePassword = GeneratePassword;
function ValidatePassword(enteredPassword, savedPassword, salt) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield GeneratePassword(enteredPassword, salt)) === savedPassword;
    });
}
exports.ValidatePassword = ValidatePassword;
function GenerateSignature(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (0, jsonwebtoken_2.sign)(payload, config_1.APP_SECRET, { expiresIn: "30d" });
        }
        catch (error) {
            console.log(error);
            return error;
        }
    });
}
exports.GenerateSignature = GenerateSignature;
const GenerateToken = (res, id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        userId: id,
        userEmail: email,
        // Add more properties to the payload if needed
    };
    try {
        const token = jsonwebtoken_1.default.sign(payload, config_1.APP_SECRET, { expiresIn: "30m" });
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return token;
    }
    catch (error) {
        // Handle any errors during token generation
        throw new Error("Error generating token");
    }
});
exports.GenerateToken = GenerateToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(token, config_1.APP_SECRET);
});
exports.verifyToken = verifyToken;
function ValidateSignature(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const signature = req.get("Authorization");
            console.log(signature);
            const payload = (0, jsonwebtoken_2.verify)(signature.split(" ")[1], config_1.APP_SECRET);
            req.user = payload;
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
exports.ValidateSignature = ValidateSignature;
function FormateData(data) {
    if (data) {
        return { data };
    }
    else {
        throw new Error("Data Not found!");
    }
}
exports.FormateData = FormateData;
