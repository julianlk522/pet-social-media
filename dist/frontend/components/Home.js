"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_2 = require("react");
const rtkHooks_1 = require("../app/hooks/rtkHooks");
const postsSlice_1 = require("../features/posts/postsSlice");
const react_router_dom_1 = require("react-router-dom");
const Posts_1 = __importDefault(require("./Posts"));
const Form_1 = __importDefault(require("./Form"));
const material_1 = require("@mui/material");
function Home() {
    const [currentPostId, setCurrentPostId] = (0, react_2.useState)(null);
    //	post search state
    const [searchTags, setSearchTags] = (0, react_2.useState)([]);
    const [searchString, setSearchString] = (0, react_2.useState)('');
    const [currentSearchTag, setCurrentSearchTag] = (0, react_2.useState)('');
    //	pagination state
    const { page } = (0, react_router_dom_1.useParams)();
    const [currentPage, setCurrentPage] = (0, react_2.useState)(page !== undefined ? page : String(1));
    const totalPages = (0, rtkHooks_1.useAppSelector)((state) => { var _a; return (_a = state.posts) === null || _a === void 0 ? void 0 : _a.totalPages; });
    const dispatch = (0, rtkHooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ container: true, justifyContent: 'space-between', alignItems: 'stretch', spacing: 3, sx: {
            p: 2,
        } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Grid, Object.assign({ item: true, xs: 12, lg: 9 }, { children: (0, jsx_runtime_1.jsx)(Posts_1.default, { setCurrentPostId: setCurrentPostId, page: currentPage }) })), (0, jsx_runtime_1.jsxs)(material_1.Grid, Object.assign({ item: true, xs: 12, lg: 3 }, { children: [(0, jsx_runtime_1.jsx)(material_1.Paper, Object.assign({ elevation: 6, sx: {
                            mb: 2,
                            p: 2,
                            display: 'flex',
                            justifyContent: 'center',
                        } }, { children: (0, jsx_runtime_1.jsx)(material_1.Pagination, { count: totalPages ? parseInt(totalPages) : 5, page: parseInt(currentPage), color: 'secondary', renderItem: (item) => (0, jsx_runtime_1.jsx)(material_1.PaginationItem, Object.assign({}, item)), onChange: (e) => {
                                setCurrentPage(e.target.innerText);
                                navigate(`/posts/page${e.target.innerText}`);
                            } }) })), (0, jsx_runtime_1.jsxs)(material_1.Paper, Object.assign({ elevation: 6, sx: {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            p: 2,
                            mb: 2,
                        } }, { children: [(0, jsx_runtime_1.jsx)(material_1.AppBar, Object.assign({ position: 'static', color: 'inherit', sx: {
                                    borderRadius: 1,
                                    mb: 2,
                                    boxShadow: 'none',
                                } }, { children: (0, jsx_runtime_1.jsx)(material_1.TextField, { name: 'search', label: 'Filter by post content', fullWidth: true, value: searchString, onChange: (e) => {
                                        e.preventDefault();
                                        setSearchString(e.target.value);
                                    } }) })), (0, jsx_runtime_1.jsx)(material_1.Autocomplete, { multiple: true, id: 'tagsSearch', options: [], value: searchTags, inputValue: currentSearchTag, onInputChange: (e) => {
                                    const target = e.target;
                                    setCurrentSearchTag(target.value);
                                }, freeSolo: true, size: 'small', onChange: (e, value) => {
                                    e.preventDefault();
                                    console.log(value);
                                    if (!value.some((tag) => tag.match(/\s/g))) {
                                        setSearchTags(value);
                                        setCurrentSearchTag('');
                                    }
                                    else
                                        return console.log('no whitespace!');
                                }, renderTags: (value, getTagProps) => value.map((option, index) => ((0, react_1.createElement)(material_1.Chip, Object.assign({ variant: 'outlined', label: option }, getTagProps({ index }), { key: index })))), renderInput: (params) => {
                                    return ((0, jsx_runtime_1.jsx)(material_1.TextField, Object.assign({}, params, { variant: 'outlined', label: 'Filter by tags', placeholder: 'e.g. Dogs' })));
                                } }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: (e) => {
                                    e.preventDefault();
                                    (!searchString.trim().length &&
                                        !searchTags.length) ||
                                        searchString.match(/[^a-zA-Z\s']/)
                                        ? console.log('nothing to see here folks')
                                        : searchString.trim().length &&
                                            !searchTags.length
                                            ? dispatch((0, postsSlice_1.searchPosts)({
                                                query: searchString.trim(),
                                            }))
                                            : dispatch((0, postsSlice_1.searchPosts)({
                                                query: searchString.trim(),
                                                tags: searchTags,
                                            }));
                                }, sx: {
                                    mt: 2,
                                } }, { children: "Search" }))] })), (0, jsx_runtime_1.jsx)(Form_1.default, { currentPostId: currentPostId !== null && currentPostId !== void 0 ? currentPostId : '', setCurrentPostId: setCurrentPostId })] }))] })));
}
exports.default = Home;
