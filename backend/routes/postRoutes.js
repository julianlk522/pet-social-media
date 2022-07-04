import express from 'express'
const router = express.Router()
import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
	unlikePost,
	searchPosts,
	getPaginatedPosts,
} from '../controllers/postsController.js'
import authMiddleware from '../middleware/authMiddleware.js'

router.route('/').get(getPosts).post(authMiddleware, createPost)

router.route('/paginated').get(getPaginatedPosts)

router
	.route('/:id')
	.patch(authMiddleware, updatePost)
	.delete(authMiddleware, deletePost)

router.route('/:postId/:userId/likePost').patch(authMiddleware, likePost)

router.route('/:postId/:userId/unlikePost').patch(authMiddleware, unlikePost)

router.route('/search').get(searchPosts)

export default router
