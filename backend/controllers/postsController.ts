import PostModel from '../models/postModel.js'
import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
	const limit = 4
	const totalDocs = await PostModel.countDocuments({})
	const fetchedPosts = await PostModel.find().sort({ _id: -1 }).limit(limit)
	res.status(200).json({
		postData: fetchedPosts,
		totalPages: Math.ceil(totalDocs / limit),
	})
})

export const getPaginatedPosts = asyncHandler(async (req, res) => {
	let { limit, index } = req.query
	if (!limit || !index)
		throw new Error('Not provided with a page, limit, and index')
	if (typeof limit !== 'string' || typeof index !== 'string') {
		res.status(400)
		throw new Error('Query params must be of type string')
	}
	const totalDocs = await PostModel.countDocuments({})
	const paginatedPosts = await PostModel.find()
		.sort({ _id: -1 })
		.limit(parseInt(limit))
		.skip(parseInt(index))
	res.status(200).json({
		postData: paginatedPosts,
		totalPages: Math.ceil(totalDocs / parseInt(limit)),
	})
})

export const createPost = asyncHandler(async (req, res) => {
	const post = req.body

	const newPost = new PostModel(post)
	await newPost.save()
	res.status(201).json({ postData: newPost })
})

export const updatePost = asyncHandler(async (req, res) => {
	const { title, message, creator, tags, imgBase64 } = req.body

	const updatedPost = await PostModel.findByIdAndUpdate(
		req.params.id,
		{ title, message, creator, tags, imgBase64 },
		{ new: true }
	)

	res.status(200).json({ postData: updatedPost })
})

export const likePost = asyncHandler(async (req, res) => {
	const { postId, userId } = req.params
	if (!postId) throw new Error('no postId provided')
	if (!userId) throw new Error('no userId provided')
	const post = await PostModel.findById(postId)

	if (!post) throw new Error('Could not locate post with specified ID')
	console.log('old likes', post.likes)
	console.log('userId', userId)
	post?.likes?.push(userId)

	await PostModel.findByIdAndUpdate(
		postId,
		{ likes: post?.likes?.filter((like) => like.match(/\w/g)) },
		{ new: true }
	)
	console.log('new likes', post.likes)
	res.status(200).json({ likes: post.likes })
})

export const unlikePost = asyncHandler(async (req, res) => {
	const { postId, userId } = req.params
	if (!postId) throw new Error('no postId provided')
	if (!userId) throw new Error('no userId provided')
	const post = await PostModel.findById(postId)
	if (!post) throw new Error('Could not locate post with specified ID')
	console.log('old likes', post.likes)
	console.log('userId', userId)

	const newLikes = post?.likes?.filter((likerId) => likerId !== userId)
	await PostModel.findByIdAndUpdate(
		postId,
		{ likes: newLikes },
		{ new: true }
	)
	console.log('new likes', newLikes)
	res.status(200).json({ likes: newLikes })
})

export const deletePost = asyncHandler(async (req, res) => {
	const post = await PostModel.findById(req.params.id)
	if (!post) throw new Error('Could not locate post with specified ID')

	await PostModel.findByIdAndDelete(req.params.id)

	res.status(200).json({ postId: post._id })
})

export const searchPosts = asyncHandler(async (req, res) => {
	const { query, tags } = req.query

	if (!query && !tags) throw new Error('no query params provided')

	if (typeof query !== 'string' || typeof tags !== 'string') {
		throw new Error('query params (query, tags) must be of type string')
	}

	const title = new RegExp(query, 'i')

	const queriedPosts =
		tags && query
			? await PostModel.find({
					$or: [{ title }, { tags: { $in: tags.split(',') } }],
			  })
			: !tags
			? await PostModel.find({ title })
			: await PostModel.find({
					tags: { $in: tags.split(',') },
			  })

	if (!queriedPosts) {
		res.status(400)
		throw new Error(
			'Could not locate posts with query and tags info provided'
		)
	}
	res.status(200).json({ postData: queriedPosts })
})
