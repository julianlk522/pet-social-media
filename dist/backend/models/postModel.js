"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const postSchema = new Schema({
    title: { type: String, required: [true, 'Please add a title'] },
    message: { type: String, required: [true, 'Please add a message'] },
    creator: { type: String, required: [true, 'Please add a creator'] },
    tags: [String],
    imgBase64: String,
    likes: [String],
    createdAt: {
        type: Date,
        default: new Date().toISOString(),
    },
});
const PostSchema = mongoose_1.default.model('Post', postSchema);
exports.default = PostSchema;
