"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = require("cloudinary");
dotenv_1.default.config();
//database
const db_1 = require("./config/db");
//routes
const auth_1 = __importDefault(require("./routes/auth"));
const hotel_1 = __importDefault(require("./routes/hotel"));
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, db_1.connectDB)();
//cludinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLODUINARY_API_SECRET,
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
//use routes
app.use("/api/auth", auth_1.default);
app.use("/api/hotel", hotel_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
