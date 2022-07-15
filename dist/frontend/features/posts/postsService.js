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
const url = 'http://localhost:5000/posts';
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(url);
    const postsData = response.data;
    return postsData;
});
const getPaginatedPosts = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    if (!page)
        page = 1;
    if (!limit)
        limit = 4;
    if (typeof page === 'string')
        page = parseInt(page);
    if (typeof limit === 'string')
        limit = parseInt(limit);
    //	starting index in posts db for desired posts AKA number of skipped documents
    const index = (page - 1) * limit;
    const response = yield axios_1.default.get(`${url}/paginated?page=${page}&limit=${limit}&index=${index}`);
    const postsData = response.data;
    return postsData;
});
const createPost = (newPost, token) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    const response = yield axios_1.default.post(url, newPost, config);
    return response.data;
});
const updatePost = (postId, updatedPost, token) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = yield axios_1.default.patch(`${url}/${postId}`, updatedPost, config);
        return response.data;
    }
    catch (error) {
        return error.message;
    }
});
const likePost = (postId, userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = yield axios_1.default.patch(`${url}/${postId}/${userId}/likePost`, [], config);
        return response.data;
    }
    catch (error) {
        return console.log(error);
    }
});
const unlikePost = (postId, userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = yield axios_1.default.patch(`${url}/${postId}/${userId}/unlikePost`, [], config);
        return response.data;
    }
    catch (error) {
        return error.message;
    }
});
const deletePost = (postId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = yield axios_1.default.delete(`${url}/${postId}`, config);
        return response.data;
    }
    catch (error) {
        return error.message;
    }
});
const searchPosts = (query, tags) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = query && tags
            ? yield axios_1.default.get(`${url}/search?query=${query}&tags=${tags}`)
            : !query && tags
                ? yield axios_1.default.get(`${url}/search?tags=${tags}`)
                : yield axios_1.default.get(`${url}/search?query=${query}`);
        return response.data;
    }
    catch (error) {
        return error.message;
    }
});
const postsService = {
    getPosts,
    getPaginatedPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    searchPosts,
};
exports.default = postsService;
