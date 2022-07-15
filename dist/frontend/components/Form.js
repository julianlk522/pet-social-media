"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const react_file_base64_1 = __importDefault(require("react-file-base64"));
const rtkHooks_1 = require("../app/hooks/rtkHooks");
const useAuthStatus_1 = require("../app/hooks/useAuthStatus");
const postsSlice_1 = require("../features/posts/postsSlice");
function Form({ currentPostId, setCurrentPostId }) {
    const [formData, setFormData] = (0, react_1.useState)({
        title: '',
        message: '',
        tags: [],
        imgBase64: '',
    });
    const dispatch = (0, rtkHooks_1.useAppDispatch)();
    const { loggedIn, loggedInUser } = (0, useAuthStatus_1.useAuthStatus)();
    const currentPost = (0, rtkHooks_1.useAppSelector)((state) => currentPostId
        ? state.posts.postsArray.find((post) => post._id === currentPostId)
        : null);
    (0, react_1.useEffect)(() => {
        if (currentPost) {
            const { title, message, tags, imgBase64 } = currentPost;
            setFormData({ title, message, tags, imgBase64 });
        }
    }, [currentPost]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPostData = Object.assign(Object.assign({}, formData), { creator: loggedInUser !== null ? loggedInUser.name : 'Creator' });
        if (currentPostId) {
            dispatch((0, postsSlice_1.updatePost)({ currentPostId, updatedPostData }));
        }
        else {
            dispatch((0, postsSlice_1.createPost)(updatedPostData));
        }
        handleClear();
    };
    const handleClear = () => {
        setCurrentPostId(null);
        setFormData({
            title: '',
            message: '',
            tags: [],
            imgBase64: '',
        });
    };
    return !loggedIn ? ((0, jsx_runtime_1.jsx)(material_1.Paper, Object.assign({ elevation: 6, sx: {
            mb: 2,
            p: 2,
            borderRadius: 4,
        } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'h6', align: 'center' }, { children: "Sign in to share your pet's greatest moments!" })) }))) : ((0, jsx_runtime_1.jsx)(material_1.Paper, Object.assign({ elevation: 6, sx: {
            mb: 2,
            p: 2,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        } }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ autoComplete: 'off', noValidate: true, onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, Object.assign({ variant: 'h6', align: 'center', sx: {
                        mt: 2,
                    } }, { children: [currentPostId ? 'Edit your ' : 'Make a New ', "Post"] })), (0, jsx_runtime_1.jsx)(material_1.TextField, { margin: 'normal', name: 'title', variant: 'outlined', label: 'Title', fullWidth: true, value: formData.title, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { title: e.target.value })) }), (0, jsx_runtime_1.jsx)(material_1.TextField, { margin: 'normal', name: 'message', variant: 'outlined', label: 'Message', fullWidth: true, value: formData.message, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { message: e.target.value })) }), (0, jsx_runtime_1.jsx)(material_1.TextField, { margin: 'normal', name: 'tags', variant: 'outlined', label: 'Tags', fullWidth: true, value: formData.tags, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { tags: e.target.value.split(',') })) }), (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: {
                        width: '90%',
                        my: 1,
                    } }, { children: (0, jsx_runtime_1.jsx)(react_file_base64_1.default, { type: 'file', multiple: false, onDone: ({ base64 }) => setFormData(Object.assign(Object.assign({}, formData), { imgBase64: base64 })) }) })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: 'contained', size: 'large', type: 'submit', fullWidth: true, sx: {
                        my: 1,
                    } }, { children: "Submit" })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: 'contained', color: 'secondary', size: 'small', onClick: handleClear, fullWidth: true }, { children: "Clear" }))] })) })));
}
exports.default = Form;
