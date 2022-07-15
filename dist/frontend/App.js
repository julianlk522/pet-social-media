"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const Navbar_1 = __importDefault(require("./components/Navbar"));
const Home_1 = __importDefault(require("./components/Home"));
const Auth_1 = __importDefault(require("./components/Auth"));
const PostDetails_1 = __importDefault(require("./components/PostDetails"));
// svg background source: https://bgjar.com/cloudy
const bgSvg = require('./assets/bg.svg');
function App() {
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(material_1.Container, { sx: {
                    backgroundImage: `url(${bgSvg})`,
                    position: 'absolute',
                    top: '0',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                }, maxWidth: false }), (0, jsx_runtime_1.jsxs)(material_1.Container, Object.assign({ maxWidth: 'xl' }, { children: [(0, jsx_runtime_1.jsx)(Navbar_1.default, {}), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/', element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: '/posts', replace: true }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/posts', element: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/posts/page:page', element: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/posts/:id', element: (0, jsx_runtime_1.jsx)(PostDetails_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/auth', element: (0, jsx_runtime_1.jsx)(Auth_1.default, {}) })] })] }))] }));
}
exports.default = App;
