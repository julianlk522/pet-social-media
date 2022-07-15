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
exports.resetPostsState = exports.searchPosts = exports.deletePost = exports.unlikePost = exports.likePost = exports.updatePost = exports.createPost = exports.getPaginatedPosts = exports.getPosts = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const postsService_1 = __importDefault(require("./postsService"));
const initialState = {
    postsArray: [],
    selectedPost: null,
    totalPages: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};
exports.getPosts = (0, toolkit_1.createAsyncThunk)('posts/getPosts', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield postsService_1.default.getPosts();
    }
    catch (error) {
        const message = (error.response &&
            (error === null || error === void 0 ? void 0 : error.response.data) &&
            error.resonse.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.getPaginatedPosts = (0, toolkit_1.createAsyncThunk)('posts/getPaginatedPosts', ({ page, limit }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield postsService_1.default.getPaginatedPosts(page, limit);
    }
    catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.resonse.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.createPost = (0, toolkit_1.createAsyncThunk)('posts/createPost', (newPost, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = (_b = (_a = thunkAPI.getState().user) === null || _a === void 0 ? void 0 : _a.currentUser) === null || _b === void 0 ? void 0 : _b.token;
        return yield postsService_1.default.createPost(newPost, token);
    }
    catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.resonse.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.updatePost = (0, toolkit_1.createAsyncThunk)('posts/updatePost', ({ currentPostId: postId, updatedPostData: updatedPost }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const token = (_d = (_c = thunkAPI.getState().user) === null || _c === void 0 ? void 0 : _c.currentUser) === null || _d === void 0 ? void 0 : _d.token;
        return yield postsService_1.default.updatePost(postId, updatedPost, token);
    }
    catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.resonse.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.likePost = (0, toolkit_1.createAsyncThunk)('posts/likePost', ({ postId }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h;
    try {
        const currentUserId = (_f = (_e = thunkAPI.getState().user) === null || _e === void 0 ? void 0 : _e.currentUser) === null || _f === void 0 ? void 0 : _f._id;
        const token = (_h = (_g = thunkAPI.getState().user) === null || _g === void 0 ? void 0 : _g.currentUser) === null || _h === void 0 ? void 0 : _h.token;
        return yield postsService_1.default.likePost(postId, currentUserId, token);
    }
    catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.resonse.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.unlikePost = (0, toolkit_1.createAsyncThunk)('posts/unlikePost', ({ postId }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l, _m;
    try {
        const currentUserId = (_k = (_j = thunkAPI.getState().user) === null || _j === void 0 ? void 0 : _j.currentUser) === null || _k === void 0 ? void 0 : _k._id;
        const token = (_m = (_l = thunkAPI.getState().user) === null || _l === void 0 ? void 0 : _l.currentUser) === null || _m === void 0 ? void 0 : _m.token;
        return yield postsService_1.default.unlikePost(postId, currentUserId, token);
    }
    catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.resonse.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.deletePost = (0, toolkit_1.createAsyncThunk)('posts/deletePost', ({ postId }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p;
    try {
        const token = (_p = (_o = thunkAPI.getState().user) === null || _o === void 0 ? void 0 : _o.currentUser) === null || _p === void 0 ? void 0 : _p.token;
        return yield postsService_1.default.deletePost(postId, token);
    }
    catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.resonse.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
exports.searchPosts = (0, toolkit_1.createAsyncThunk)('posts/searchPosts', ({ query, tags }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        tags
            ? console.log(`query: ${query}, tags: ${tags.join(',')}`)
            : console.log(`query: ${query}`);
        return yield postsService_1.default.searchPosts(query, tags && tags.join(','));
    }
    catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.resonse.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}));
const postsSlice = (0, toolkit_1.createSlice)({
    name: 'posts',
    initialState,
    reducers: {
        resetPostsState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
            state.totalPages = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(exports.getPosts.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.getPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.postsArray = action.payload.postData
                ? action.payload.postData
                : state.postsArray;
            state.totalPages = action.payload.totalPages
                ? action.payload.totalPages
                : state.totalPages;
        })
            .addCase(exports.getPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
        })
            .addCase(exports.getPaginatedPosts.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.getPaginatedPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.postsArray = action.payload.postData
                ? action.payload.postData
                : state.postsArray;
            state.totalPages = action.payload.totalPages
                ? action.payload.totalPages
                : state.totalPages;
        })
            .addCase(exports.getPaginatedPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
        })
            .addCase(exports.searchPosts.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.searchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.postsArray = action.payload.postData
                ? action.payload.postData
                : state.postsArray;
        })
            .addCase(exports.searchPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
        })
            .addCase(exports.createPost.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.createPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            action.payload.postData !== null &&
                state.postsArray.push(action.payload.postData);
        })
            .addCase(exports.createPost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
        })
            .addCase(exports.updatePost.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.updatePost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action.payload.postData);
            state.postsArray = state.postsArray.map((post) => post._id === action.payload.postData._id
                ? action.payload.postData
                : post);
        })
            .addCase(exports.updatePost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
        })
            .addCase(exports.deletePost.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.deletePost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.postsArray = state.postsArray.filter((post) => post._id !== action.payload.postId);
        })
            .addCase(exports.deletePost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
        });
    },
});
exports.resetPostsState = postsSlice.actions.resetPostsState;
exports.default = postsSlice.reducer;
