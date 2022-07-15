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
const react_1 = require("react");
const rtkHooks_1 = require("../app/hooks/rtkHooks");
const react_router_dom_1 = require("react-router-dom");
const postsSlice_1 = require("../features/posts/postsSlice");
const userSlice_1 = require("../features/users/userSlice");
const material_1 = require("@mui/material");
const ThumbUpAlt_1 = __importDefault(require("@mui/icons-material/ThumbUpAlt"));
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const MoreHoriz_1 = __importDefault(require("@mui/icons-material/MoreHoriz"));
const date_fns_1 = require("date-fns");
function Post({ post, setCurrentPostId, featuresDisabled, loggedInUser, }) {
    const dispatch = (0, rtkHooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const likes = post === null || post === void 0 ? void 0 : post.likes;
    const isLoading = (0, rtkHooks_1.useAppSelector)((state) => { var _a; return (_a = state.user.isLoading) !== null && _a !== void 0 ? _a : false; });
    const [deleteDialogOpen, setDeleteDialogOpen] = (0, react_1.useState)(false);
    const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = (0, react_1.useState)(false);
    // passInput state authorization
    const [passInput, setPassInput] = (0, react_1.useState)('');
    // liked/likeCount state
    const [liked, setLiked] = (0, react_1.useState)(false);
    const [likeCount, setLikeCount] = (0, react_1.useState)(likes !== undefined ? likes.length : 0);
    (0, react_1.useEffect)(() => {
        const checkIfUserLiked = () => {
            if ((loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser._id) && (likes === null || likes === void 0 ? void 0 : likes.includes(loggedInUser._id))) {
                setLiked(true);
            }
        };
        checkIfUserLiked();
    }, [loggedInUser, likes]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Card, Object.assign({ raised: true, elevation: 6, sx: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: 4,
            height: '100%',
            position: 'relative',
        } }, { children: [(0, jsx_runtime_1.jsx)(material_1.CardMedia, { onClick: () => navigate(`/posts/${post._id}`, {
                    state: {
                        post: post,
                        liked: liked,
                        likeCount: likeCount,
                        featuresDisabled: featuresDisabled,
                        loggedInUser: loggedInUser,
                    },
                }), image: post.imgBase64, title: post.title, sx: {
                    pt: '50%',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    backgroundBlendMode: 'darken',
                    cursor: 'pointer',
                } }), (0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: {
                    position: 'absolute',
                    top: '5%',
                    left: '5%',
                    color: 'white',
                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'h6' }, { children: post.creator })), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'body2' }, { children: (0, date_fns_1.formatDistanceToNow)(new Date(post === null || post === void 0 ? void 0 : post.createdAt)) }))] })), (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: {
                    position: 'absolute',
                    top: '5%',
                    right: '5%',
                    color: 'white',
                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ size: 'small', onClick: () => setCurrentPostId(post._id), disabled: (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.admin)
                        ? false
                        : featuresDisabled ||
                            (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.name) !== post.creator, sx: {
                        color: 'white',
                    } }, { children: (0, jsx_runtime_1.jsx)(MoreHoriz_1.default, {}) })) })), (0, jsx_runtime_1.jsxs)(material_1.CardContent, Object.assign({ onClick: () => navigate(`/posts/${post._id}`, {
                    state: {
                        post: post,
                        liked: liked,
                        likeCount: likeCount,
                        featuresDisabled: featuresDisabled,
                        loggedInUser: loggedInUser,
                    },
                }), sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: {
                            m: 1,
                        } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'body2', align: 'center' }, { children: post.tags.map((tag) => `#${tag} `) })) })), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'h5', sx: {
                            px: 2,
                            m: 1,
                        } }, { children: post.title })), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'body2', color: 'textSecondary', sx: {
                            m: 1,
                        } }, { children: post.message }))] })), (0, jsx_runtime_1.jsxs)(material_1.CardActions, Object.assign({ sx: {
                    px: 2,
                    pt: 1,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                } }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ size: 'small', sx: {
                            display: 'flex',
                            alignItems: 'center',
                        }, onClick: (e) => {
                            e.preventDefault();
                            if (!liked) {
                                dispatch((0, postsSlice_1.likePost)({ postId: post._id }));
                                setLikeCount((likeCount) => likeCount + 1);
                            }
                            else {
                                dispatch((0, postsSlice_1.unlikePost)({ postId: post._id }));
                                setLikeCount((likeCount) => likeCount - 1);
                            }
                            setLiked(!liked);
                        }, disabled: (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.admin)
                            ? false
                            : featuresDisabled ||
                                (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.name) !== post.creator }, { children: [(0, jsx_runtime_1.jsx)(ThumbUpAlt_1.default, { fontSize: 'small', color: liked ? 'primary' : 'action', sx: {
                                    mr: 1,
                                    transform: liked ? 'scale(1.1)' : '',
                                } }), (0, jsx_runtime_1.jsxs)("span", Object.assign({ id: 'likeDetails', style: {
                                    color: 'rgb(119, 119, 119)',
                                } }, { children: ["Likes", ` (${likeCount})`] }))] })), (0, jsx_runtime_1.jsxs)(material_1.Button, Object.assign({ size: 'small', onClick: () => {
                            setDeleteDialogOpen(true);
                        }, disabled: (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.admin)
                            ? false
                            : featuresDisabled ||
                                (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.name) !== post.creator }, { children: [(0, jsx_runtime_1.jsx)(Delete_1.default, { fontSize: 'small', sx: {
                                    mr: 1,
                                } }), "Delete"] })), (0, jsx_runtime_1.jsxs)(material_1.Dialog, Object.assign({ open: deleteDialogOpen, onClose: () => setDeleteDialogOpen(false), "aria-labelledby": 'delete-button-dialog-box', "aria-describedby": 'delete-dialog-prompt' }, { children: [(0, jsx_runtime_1.jsx)(material_1.DialogTitle, Object.assign({ id: 'delete-button-dialog-box' }, { children: 'Are you sure you want to delete this post?' })), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { children: (0, jsx_runtime_1.jsx)(material_1.DialogContentText, Object.assign({ id: 'delete-dialog-prompt' }, { children: "Once the post is deleted it will be removed from PetSocial forever!" })) }), (0, jsx_runtime_1.jsxs)(material_1.DialogActions, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => setDeleteDialogOpen(false) }, { children: "Nevermind" })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => {
                                            setDeleteDialogOpen(false);
                                            setConfirmDeleteDialogOpen(true);
                                        } }, { children: "Delete the post" }))] })] })), (0, jsx_runtime_1.jsxs)(material_1.Dialog, Object.assign({ open: confirmDeleteDialogOpen, onClose: () => setConfirmDeleteDialogOpen(false), "aria-labelledby": 'confirm-delete-button-dialog-box', "aria-describedby": 'confirm-delete-dialog-prompt' }, { children: [(0, jsx_runtime_1.jsx)(material_1.DialogTitle, Object.assign({ id: 'confirm-delete-button-dialog-box' }, { children: 'Confirm' })), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { children: isLoading ? ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: {
                                        display: 'flex',
                                        height: '50%',
                                        minWidth: '20vw',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    } }, { children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { color: 'secondary', size: '4rem' }) }))) : ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.DialogContentText, Object.assign({ id: 'confirm-delete-dialog-prompt' }, { children: "Please re-enter your password to confirm your deletion." })), (0, jsx_runtime_1.jsx)(material_1.TextField, { autoFocus: true, value: passInput, onChange: (e) => {
                                                setPassInput(e.target.value);
                                                console.log(e.target.value);
                                            }, margin: 'dense', id: 'confirm-pass-input', label: 'Password', type: 'password', fullWidth: true, variant: 'standard' })] })) }), (0, jsx_runtime_1.jsxs)(material_1.DialogActions, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => setConfirmDeleteDialogOpen(false) }, { children: "Return" })), !isLoading && loggedInUser && ((0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => __awaiter(this, void 0, void 0, function* () {
                                            const response = yield dispatch((0, userSlice_1.checkUserPassword)({
                                                _id: loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser._id,
                                                pass: passInput,
                                            }));
                                            console.log(response);
                                            if ((response === null || response === void 0 ? void 0 : response.type) ===
                                                'users/checkUserPassword/fulfilled') {
                                                dispatch((0, postsSlice_1.deletePost)({ postId: post._id }));
                                                setConfirmDeleteDialogOpen(false);
                                            }
                                            else
                                                return console.log('nope!');
                                        }) }, { children: "Delete" })))] })] }))] }))] })));
}
exports.default = Post;
