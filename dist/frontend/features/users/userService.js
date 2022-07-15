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
const axios_1 = __importDefault(require("axios"));
const url = 'http://localhost:5000/users';
// const config = {
//     headers: {
//         "Content-Type": "application/json"
//     }
// }
const registerUser = (signUpData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(url, signUpData);
    if (response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
});
const loginUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${url}/login`, loginData);
    if (response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
});
const logoutUser = () => {
    return localStorage.clear();
};
const checkUserPassword = (_id, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${url}/authorize`, {
        _id,
        pass,
    });
    return response.data;
});
const userService = {
    registerUser,
    loginUser,
    logoutUser,
    checkUserPassword,
};
exports.default = userService;
