"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const rtkHooks_1 = require("../app/hooks/rtkHooks");
const postsSlice_1 = require("../features/posts/postsSlice");
const useAuthStatus_1 = require("../app/hooks/useAuthStatus");
const Post_1 = __importDefault(require("./Post"));
const material_1 = require("@mui/material");
function Posts({ setCurrentPostId, page }) {
    const dispatch = (0, rtkHooks_1.useAppDispatch)();
    const isLoading = (0, rtkHooks_1.useAppSelector)((state) => state.posts.isLoading);
    const posts = (0, rtkHooks_1.useAppSelector)((state) => state.posts.postsArray);
    const { loggedIn, loggedInUser } = (0, useAuthStatus_1.useAuthStatus)();
    const [featuresDisabled, setFeaturesDisabled] = (0, react_1.useState)(true);
    //	fetch post data on load
    (0, react_1.useEffect)(() => {
        page ? dispatch((0, postsSlice_1.getPaginatedPosts)({ page })) : dispatch((0, postsSlice_1.getPosts)());
    }, [dispatch, page]);
    //	check if signed in, if so grant editing privileges
    (0, react_1.useEffect)(() => {
        if (loggedIn)
            setFeaturesDisabled(false);
    }, [loggedIn]);
    return isLoading ? ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: {
            display: 'flex',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
        } }, { children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { color: 'secondary' }) }))) : posts.length ? ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ container: true, alignItems: 'stretch', spacing: 3 }, { children: posts.map((post) => ((0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, xs: 12, md: 6 }, { children: (0, jsx_runtime_1.jsx)(Post_1.default, { post: post, setCurrentPostId: setCurrentPostId, featuresDisabled: featuresDisabled, loggedInUser: loggedInUser }) }), post._id))) }))) : ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: {
            display: 'flex',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
        } }, { children: (0, jsx_runtime_1.jsx)("h3", { children: "Seems there are no posts that match your search! Sorry..." }) })));
}
exports.default = Posts;
