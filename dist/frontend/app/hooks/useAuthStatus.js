"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthStatus = void 0;
const react_1 = require("react");
const rtkHooks_1 = require("./rtkHooks");
const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = (0, react_1.useState)(false);
    const [firstName, setFirstName] = (0, react_1.useState)('');
    const [firstLetter, setFirstLetter] = (0, react_1.useState)('');
    const loggedInUser = (0, rtkHooks_1.useAppSelector)((state) => state.user.currentUser);
    //  set loggedIn based on state value
    (0, react_1.useEffect)(() => {
        if (loggedInUser) {
            setLoggedIn(true);
            setFirstName(loggedInUser.name
                .slice(0, 1)
                .toUpperCase()
                .concat(loggedInUser.name.slice(1)));
            setFirstLetter(loggedInUser.name[0].toUpperCase());
        }
        else {
            setLoggedIn(false);
            setFirstName('');
            setFirstLetter('');
        }
    }, [loggedInUser]);
    return { loggedIn, firstName, firstLetter, loggedInUser };
};
exports.useAuthStatus = useAuthStatus;
