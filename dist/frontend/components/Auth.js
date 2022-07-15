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
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const LockOutlined_1 = __importDefault(require("@mui/icons-material/LockOutlined"));
const react_1 = require("react");
const rtkHooks_1 = require("../app/hooks/rtkHooks");
const react_router_dom_1 = require("react-router-dom");
const userSlice_1 = require("../features/users/userSlice");
function Auth() {
    const dispatch = (0, rtkHooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [isSignUp, setIsSignUp] = (0, react_1.useState)(true);
    const [formData, setFormData] = (0, react_1.useState)({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = formData;
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (isSignUp) {
            const signUpData = {
                name,
                email,
                password,
            };
            const signupResponse = yield dispatch((0, userSlice_1.registerUser)(signUpData));
            if (signupResponse.type === 'users/registerUser/fulfilled') {
                dispatch((0, userSlice_1.resetUserState)());
                return navigate('/');
            }
            else {
                return console.log('bad login info provided!');
            }
        }
        else {
            const loginData = {
                email,
                password,
            };
            const loginResponse = yield dispatch((0, userSlice_1.loginUser)(loginData));
            if (loginResponse.type === 'users/loginUser/fulfilled') {
                dispatch((0, userSlice_1.resetUserState)());
                return navigate('/');
            }
            else {
                return console.log('bad login info provided!');
            }
        }
    });
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    return ((0, jsx_runtime_1.jsx)(material_1.Container, Object.assign({ maxWidth: 'xs', sx: {
            mt: 8,
        } }, { children: (0, jsx_runtime_1.jsxs)(material_1.Paper, Object.assign({ elevation: 3, sx: {
                my: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
            } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Avatar, Object.assign({ sx: {
                        my: 1,
                        backgroundColor: 'red',
                    } }, { children: (0, jsx_runtime_1.jsx)(LockOutlined_1.default, {}) })), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'h5', sx: {
                        mb: 2,
                    } }, { children: isSignUp ? 'Sign Up' : 'Sign In' })), (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } }, { children: (0, jsx_runtime_1.jsx)("form", Object.assign({ onSubmit: handleSubmit }, { children: (0, jsx_runtime_1.jsxs)(material_1.Container, Object.assign({ sx: {
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            } }, { children: [isSignUp && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.TextField, { name: 'name', label: 'Name', value: name, onChange: handleChange, autoFocus: true, variant: 'outlined', required: true, fullWidth: true, sx: {
                                            mb: 2,
                                        } }) })), (0, jsx_runtime_1.jsx)(material_1.TextField, { name: 'email', label: 'Email Address', type: 'email', value: email, onChange: handleChange, variant: 'outlined', required: true, fullWidth: true, sx: {
                                        mb: 2,
                                    } }), (0, jsx_runtime_1.jsx)(material_1.TextField, { name: 'password', label: 'Password', type: 'password', value: password, onChange: handleChange, variant: 'outlined', required: true, fullWidth: true }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ type: 'submit', fullWidth: true, variant: 'contained', color: 'secondary', sx: {
                                        mb: 2,
                                        mt: 4,
                                    } }, { children: isSignUp ? 'Sign Up' : 'Sign In' })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => {
                                        setIsSignUp(!isSignUp);
                                        setFormData({
                                            name: '',
                                            email: '',
                                            password: '',
                                        });
                                    }, variant: 'contained', color: 'primary', sx: {
                                        my: 2,
                                    } }, { children: isSignUp
                                        ? 'Already have an account? Sign In'
                                        : "Don't have an account yet? Sign Up!" }))] })) })) }))] })) })));
}
exports.default = Auth;
