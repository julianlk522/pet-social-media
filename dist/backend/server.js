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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
//  Mongoose connect
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const conn = yield mongoose_1.default.connect((_a = process.env.MONGO_CLUSTER_CONNECTION_STRING) !== null && _a !== void 0 ? _a : '');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
});
connectDB();
app.use(express_1.default.json({ limit: '25mb' }));
app.use(express_1.default.urlencoded({ extended: false, limit: '25mb' }));
app.use((0, cors_1.default)());
// Error middleware
app.use(errorMiddleware_1.errorHandler);
//  Routes
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
app.use('/posts', postRoutes_1.default);
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
app.use('/users', userRoutes_1.default);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
