"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const postsController_1 = require("../controllers/postsController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
router.route('/').get(postsController_1.getPosts).post(authMiddleware_1.default, postsController_1.createPost);
router.route('/paginated').get(postsController_1.getPaginatedPosts);
router
    .route('/:id')
    .patch(authMiddleware_1.default, postsController_1.updatePost)
    .delete(authMiddleware_1.default, postsController_1.deletePost);
router.route('/:postId/:userId/likePost').patch(authMiddleware_1.default, postsController_1.likePost);
router.route('/:postId/:userId/unlikePost').patch(authMiddleware_1.default, postsController_1.unlikePost);
router.route('/search').get(postsController_1.searchPosts);
exports.default = router;
