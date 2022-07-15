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
exports.checkUserPassword = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const createBearerToken = (id) => {
    if (!id || !process.env.JWT_SECRET) {
        throw new Error('id or JWT secret not found');
    }
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET);
};
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error(`Name, email, and password must all be provided, received ${name}, ${email}, ${password}`);
    }
    //  Check if user already exists
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists with email provided');
    }
    //  Hash password
    const salt = yield bcryptjs_1.default.genSalt();
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    //  Create user in MDB
    const user = yield userModel_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    //  Send back response with new user data
    if (user) {
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: createBearerToken(user._id.toString()),
            admin: user.isAdmin,
        };
        res.status(201).json({ userData });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data supplied');
    }
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //  Check if user exists with email provided
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error('User not found with email provided');
    }
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: createBearerToken(user._id.toString()),
            admin: user.isAdmin,
        };
        res.status(200).json({
            userData,
        });
    }
    else {
        res.status(401);
        throw new Error('Incorrect password provided');
    }
}));
exports.checkUserPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, pass } = req.body;
    //  Locate user
    const user = yield userModel_1.default.findById(_id);
    if (!user)
        throw new Error('No user found with ID provided');
    console.log(user);
    if (yield bcryptjs_1.default.compare(pass, user.password)) {
        res.status(200).json({ status: 'success' });
    }
    throw new Error('Password does not match: access denied');
}));
