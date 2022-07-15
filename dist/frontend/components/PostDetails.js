"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const rtkHooks_1 = require("../app/hooks/rtkHooks");
const postsSlice_1 = require("../features/posts/postsSlice");
const ThumbUpAlt_1 = __importDefault(require("@mui/icons-material/ThumbUpAlt"));
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const date_fns_1 = require("date-fns");
function PostDetails() {
    var _a, _b, _c;
    const dispatch = (0, rtkHooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const { post, liked, likeCount, featuresDisabled, loggedInUser } = location.state;
    // local liked/likeCount state
    const [detailsLiked, setDetailsLiked] = (0, react_1.useState)(liked);
    const [detailsLikeCount, setDetailsLikeCount] = (0, react_1.useState)(likeCount);
    return ((0, jsx_runtime_1.jsxs)(material_1.Paper, Object.assign({ elevation: 6, sx: { p: 4, borderRadius: 4 } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ align: 'center', variant: 'h2', sx: {
                    mb: 4,
                } }, { children: post.title })), (0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: {
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    width: '100%',
                } }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: {
                            minWidth: '50%',
                            maxWidth: '50%',
                        } }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "Created by:" }), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'h6', color: 'primary', sx: { display: 'inline', ml: 2 } }, { children: post.creator })), (0, jsx_runtime_1.jsx)(material_1.Divider, { sx: { my: 2 } }), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'body1', align: 'center', sx: {
                                    my: 8,
                                } }, { children: post.message })), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'h6', color: 'secondary', sx: {
                                    mb: 2,
                                } }, { children: (_a = post.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => `#${tag} `) })), (0, jsx_runtime_1.jsxs)(material_1.Typography, Object.assign({ variant: 'body1' }, { children: [(0, date_fns_1.formatDistanceToNow)(new Date(post.createdAt)), " ago"] })), (0, jsx_runtime_1.jsx)(material_1.Divider, { sx: { my: 2 } }), (0, jsx_runtime_1.jsxs)(material_1.Typography, Object.assign({ variant: 'body1', sx: {
                                    my: 2,
                                } }, { children: ["Comments: ", (0, jsx_runtime_1.jsx)("strong", { children: "None yet!" })] })), (0, jsx_runtime_1.jsx)(material_1.Divider, { sx: { my: 2 } }), (0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: {
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    width: '100%',
                                    mt: 8,
                                } }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ size: 'small', sx: {
                                            display: 'flex',
                                            alignItems: 'center',
                                        }, onClick: (e) => {
                                            e.preventDefault();
                                            if (!detailsLiked) {
                                                dispatch((0, postsSlice_1.likePost)({ postId: post._id }));
                                                setDetailsLikeCount((detailsLikeCount) => detailsLikeCount + 1);
                                            }
                                            else {
                                                dispatch((0, postsSlice_1.unlikePost)({ postId: post._id }));
                                                setDetailsLikeCount((detailsLikeCount) => detailsLikeCount - 1);
                                            }
                                            setDetailsLiked(!detailsLiked);
                                        }, disabled: !((_b = loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.currentUser) === null || _b === void 0 ? void 0 : _b.admin) ||
                                            featuresDisabled ||
                                            ((_c = loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.currentUser) === null || _c === void 0 ? void 0 : _c.name) !== post.creator }, { children: [(0, jsx_runtime_1.jsx)(ThumbUpAlt_1.default, { fontSize: 'small', color: detailsLiked ? 'primary' : 'action', sx: {
                                                    mr: 1,
                                                    transform: detailsLiked ? 'scale(1.1)' : '',
                                                } }), (0, jsx_runtime_1.jsxs)("span", Object.assign({ id: 'likeDetails', style: {
                                                    color: 'rgb(119, 119, 119)',
                                                } }, { children: ["Likes", ` (${detailsLikeCount})`] }))] })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ color: 'secondary', onClick: () => {
                                            navigate('/posts');
                                        } }, { children: "Return to Posts" }))] }))] })), (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: {
                            p: 2,
                            display: 'flex',
                            justifyContent: 'flex-end',
                        } }, { children: (0, jsx_runtime_1.jsx)("img", { style: {
                                maxWidth: '100%',
                                maxHeight: '500px',
                                borderRadius: '2rem',
                                objectFit: 'contain',
                            }, src: post.imgBase64, alt: 'the pic' }) }))] }))] })));
}
exports.default = PostDetails;
