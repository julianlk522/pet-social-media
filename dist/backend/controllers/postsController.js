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
exports.searchPosts = exports.deletePost = exports.unlikePost = exports.likePost = exports.updatePost = exports.createPost = exports.getPaginatedPosts = exports.getPosts = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.getPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 4;
    const totalDocs = yield postModel_1.default.countDocuments({});
    const fetchedPosts = yield postModel_1.default.find().sort({ _id: -1 }).limit(limit);
    res.status(200).json({
        postData: fetchedPosts,
        totalPages: Math.ceil(totalDocs / limit),
    });
}));
exports.getPaginatedPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { limit, index } = req.query;
    if (!limit || !index)
        throw new Error('Not provided with a page, limit, and index');
    if (typeof limit !== 'string' || typeof index !== 'string') {
        res.status(400);
        throw new Error('Query params must be of type string');
    }
    const totalDocs = yield postModel_1.default.countDocuments({});
    const paginatedPosts = yield postModel_1.default.find()
        .sort({ _id: -1 })
        .limit(parseInt(limit))
        .skip(parseInt(index));
    res.status(200).json({
        postData: paginatedPosts,
        totalPages: Math.ceil(totalDocs / parseInt(limit)),
    });
}));
exports.createPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.body;
    const newPost = new postModel_1.default(post);
    yield newPost.save();
    res.status(201).json({ postData: newPost });
}));
exports.updatePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, message, creator, tags, imgBase64 } = req.body;
    const updatedPost = yield postModel_1.default.findByIdAndUpdate(req.params.id, { title, message, creator, tags, imgBase64 }, { new: true });
    res.status(200).json({ postData: updatedPost });
}));
exports.likePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { postId, userId } = req.params;
    if (!postId)
        throw new Error('no postId provided');
    if (!userId)
        throw new Error('no userId provided');
    const post = yield postModel_1.default.findById(postId);
    if (!post)
        throw new Error('Could not locate post with specified ID');
    console.log('old likes', post.likes);
    console.log('userId', userId);
    (_a = post === null || post === void 0 ? void 0 : post.likes) === null || _a === void 0 ? void 0 : _a.push(userId);
    yield postModel_1.default.findByIdAndUpdate(postId, { likes: (_b = post === null || post === void 0 ? void 0 : post.likes) === null || _b === void 0 ? void 0 : _b.filter((like) => like.match(/\w/g)) }, { new: true });
    console.log('new likes', post.likes);
    res.status(200).json({ likes: post.likes });
}));
exports.unlikePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { postId, userId } = req.params;
    if (!postId)
        throw new Error('no postId provided');
    if (!userId)
        throw new Error('no userId provided');
    const post = yield postModel_1.default.findById(postId);
    if (!post)
        throw new Error('Could not locate post with specified ID');
    console.log('old likes', post.likes);
    console.log('userId', userId);
    const newLikes = (_c = post === null || post === void 0 ? void 0 : post.likes) === null || _c === void 0 ? void 0 : _c.filter((likerId) => likerId !== userId);
    yield postModel_1.default.findByIdAndUpdate(postId, { likes: newLikes }, { new: true });
    console.log('new likes', newLikes);
    res.status(200).json({ likes: newLikes });
}));
exports.deletePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(req.params.id);
    if (!post)
        throw new Error('Could not locate post with specified ID');
    yield postModel_1.default.findByIdAndDelete(req.params.id);
    res.status(200).json({ postId: post._id });
}));
exports.searchPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, tags } = req.query;
    if (!query && !tags)
        throw new Error('no query params provided');
    if (typeof query !== 'string' || typeof tags !== 'string') {
        throw new Error('query params (query, tags) must be of type string');
    }
    const title = new RegExp(query, 'i');
    const queriedPosts = tags && query
        ? yield postModel_1.default.find({
            $or: [{ title }, { tags: { $in: tags.split(',') } }],
        })
        : !tags
            ? yield postModel_1.default.find({ title })
            : yield postModel_1.default.find({
                tags: { $in: tags.split(',') },
            });
    if (!queriedPosts) {
        res.status(400);
        throw new Error('Could not locate posts with query and tags info provided');
    }
    res.status(200).json({ postData: queriedPosts });
}));
