"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.hotelCreationSchema = exports.userRegistrationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userRegistrationSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    password: joi_1.default.string().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)),
    confirm_password: joi_1.default.any().equal(joi_1.default.ref("password")).required().label("Confirm Password").messages({ "any.only": "{{#label}} does not match" }),
});
exports.hotelCreationSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    facilities: joi_1.default.string().required(),
    pricePerNight: joi_1.default.number().required(),
});
exports.userLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)).required(),
});
