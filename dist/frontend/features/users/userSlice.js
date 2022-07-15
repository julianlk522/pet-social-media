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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserState = exports.checkUserPassword = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const userService_1 = __importDefault(require("./userService"));
//  Check localstorage for user
const savedUser = JSON.parse((_a = localStorage.getItem('user')) !== null && _a !== void 0 ? _a : '');
const initialState = {
    currentUser: savedUser ? savedUser : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};
exports.registerUser = (0, toolkit_1.createAsyncThunk)('users/registerUser', (signUpData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield userService_1.default.registerUser(signUpData);
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
exports.loginUser = (0, toolkit_1.createAsyncThunk)('users/loginUser', (loginData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield userService_1.default.loginUser(loginData);
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
exports.logoutUser = (0, toolkit_1.createAsyncThunk)('users/logoutUser', () => __awaiter(void 0, void 0, void 0, function* () {
    yield userService_1.default.logoutUser();
}));
exports.checkUserPassword = (0, toolkit_1.createAsyncThunk)('users/checkUserPassword', ({ _id, pass }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield userService_1.default.checkUserPassword(_id, pass);
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
const userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState,
    reducers: {
        resetUserState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers(builder) {
        builder
            .addCase(exports.registerUser.fulfilled, (state, action) => {
            state.isLoading = true;
            state.isSuccess = true;
            state.currentUser = action.payload.userData;
        })
            .addCase(exports.registerUser.rejected, (state, action) => {
            state.isError = true;
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
        })
            .addCase(exports.loginUser.fulfilled, (state, action) => {
            state.isLoading = true;
            state.isSuccess = true;
            state.currentUser = action.payload.userData;
        })
            .addCase(exports.loginUser.rejected, (state, action) => {
            state.isError = true;
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
        })
            .addCase(exports.logoutUser.fulfilled, (state) => {
            state.currentUser = null;
        })
            .addCase(exports.checkUserPassword.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.checkUserPassword.fulfilled, (state) => {
            state.isSuccess = true;
            state.isLoading = false;
        })
            .addCase(exports.checkUserPassword.rejected, (state, action) => {
            state.isError = true;
            state.message =
                typeof action.payload === 'string' ? action.payload : '';
            state.isLoading = false;
        });
    },
});
exports.resetUserState = userSlice.actions.resetUserState;
exports.default = userSlice.reducer;
