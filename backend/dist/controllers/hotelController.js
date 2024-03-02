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
exports.createHotel = void 0;
const hotelModel_1 = __importDefault(require("../models/hotelModel"));
const multer_1 = require("../utils/multer");
const createHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newHotel = req.body;
        const name = newHotel.name;
        console.log(name);
        const imageFiles = req.files;
        const imageUrls = yield (0, multer_1.uploadImages)(imageFiles);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        const oldHotel = yield hotelModel_1.default.findOne({ name });
        if (oldHotel) {
            return res.status(400).json({ message: "hotel already exists please" });
        }
        const hotel = new hotelModel_1.default(newHotel);
        //check if hotel exists
        yield hotel.save();
        res.status(201).json(hotel);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createHotel = createHotel;
