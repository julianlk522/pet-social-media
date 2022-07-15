"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const postsSlice_1 = __importDefault(require("../features/posts/postsSlice"));
const userSlice_1 = __importDefault(require("../features/users/userSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        posts: postsSlice_1.default,
        user: userSlice_1.default,
    },
});
