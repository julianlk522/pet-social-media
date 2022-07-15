"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
router.route('/').post(userController_1.registerUser);
router.route('/login').post(userController_1.loginUser);
router.route('/authorize').post(userController_1.checkUserPassword);
exports.default = router;
