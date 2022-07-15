"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const rtkHooks_1 = require("../app/hooks/rtkHooks");
const userSlice_1 = require("../features/users/userSlice");
const useAuthStatus_1 = require("../app/hooks/useAuthStatus");
const material_1 = require("@mui/material");
const colors_1 = require("@mui/material/colors");
const BuildCircle_1 = __importDefault(require("@mui/icons-material/BuildCircle"));
const dogLogo = require('../assets/dogLogo.png');
function Navbar() {
    const dispatch = (0, rtkHooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { loggedIn, loggedInUser, firstName, firstLetter } = (0, useAuthStatus_1.useAuthStatus)();
    const [logoutDialogOpen, setLogoutDialogOpen] = (0, react_1.useState)(false);
    const possibleAvatarColors = [
        colors_1.deepOrange[500],
        colors_1.amber[500],
        colors_1.cyan[500],
        colors_1.indigo[500],
        colors_1.lime[500],
        colors_1.pink[500],
        colors_1.teal[500],
        colors_1.blue[500],
        colors_1.green[500],
    ];
    const avatarColorsIndex = (firstLetter === null || firstLetter === void 0 ? void 0 : firstLetter.charCodeAt(0)) % possibleAvatarColors.length;
    return ((0, jsx_runtime_1.jsxs)(material_1.AppBar, Object.assign({ position: 'static', color: 'inherit', sx: {
            borderRadius: 4,
            py: 1,
            px: 4,
            my: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        } }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: {
                    display: 'flex',
                    flexDirection: 'row',
                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: 'h2', align: 'center', component: react_router_dom_1.Link, to: '/', sx: {
                            textDecoration: 'none',
                        } }, { children: "PetSocial" })), (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: {
                            mx: 5,
                        } }, { children: (0, jsx_runtime_1.jsx)("img", { src: dogLogo, alt: 'logo', height: '75' }) }))] })), loggedIn ? ((0, jsx_runtime_1.jsxs)(material_1.Box, Object.assign({ sx: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '30%',
                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Avatar, Object.assign({ sx: {
                            bgcolor: avatarColorsIndex
                                ? possibleAvatarColors[avatarColorsIndex]
                                : colors_1.deepOrange[500],
                        } }, { children: firstLetter && firstLetter })), (0, jsx_runtime_1.jsxs)(material_1.Typography, Object.assign({ sx: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold',
                        } }, { children: [firstName && firstName, (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.admin) && ((0, jsx_runtime_1.jsx)(BuildCircle_1.default, { color: 'secondary', sx: { ml: 2 } }))] })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: 'contained', color: 'secondary', onClick: () => {
                            setLogoutDialogOpen(true);
                        } }, { children: "Logout" })), (0, jsx_runtime_1.jsxs)(material_1.Dialog, Object.assign({ open: logoutDialogOpen, onClose: () => setLogoutDialogOpen(false), "aria-labelledby": 'logout-button-dialog-box', "aria-describedby": 'prompts the user with a confirmation dialog for logging out' }, { children: [(0, jsx_runtime_1.jsx)(material_1.DialogTitle, { children: 'Logout user?' }), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { children: (0, jsx_runtime_1.jsx)(material_1.DialogContentText, { children: "Are you sure you want to logout? If so you will be redirected to the login page." }) }), (0, jsx_runtime_1.jsxs)(material_1.DialogActions, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => setLogoutDialogOpen(false) }, { children: "Nevermind" })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: () => {
                                            setLogoutDialogOpen(false);
                                            dispatch((0, userSlice_1.logoutUser)());
                                            navigate('/auth');
                                        } }, { children: "Log me out!" }))] })] }))] }))) : ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: {
                    display: 'flex',
                    flexDirection: 'row',
                    px: 2,
                } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: 'contained', onClick: () => navigate('/auth') }, { children: "Sign In" })) })))] })));
}
exports.default = Navbar;
