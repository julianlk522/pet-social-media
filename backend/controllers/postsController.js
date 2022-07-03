import mongoose from 'mongoose'
import PostModel from '../models/postModel.js'
import asyncHandler from 'express-async-handler'

export const getPosts = asyncHandler(async (req, res) => {
	try {
		const fetchedPosts = await PostModel.find()
		res.status(200).json(fetchedPosts)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
})

export const getPaginatedPosts = asyncHandler(async (req, res) => {
	try {
		let { page, limit } = req.query
		if (!page) page = 1
		if (!limit) limit = 3
		const index = page * limit - 1
		const totalDocs = await PostModel.countDocuments({})
		const paginatedPosts = await PostModel.find()
			.sort({ _id: -1 })
			.limit(limit)
			.skip(index)
		res.status(200).json({
			postData: paginatedPosts,
			page,
			totalPages: Math.ceil(totalDocs / limit),
		})
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
})

export const createPost = async (req, res) => {
	const post = req.body

	const newPost = new PostModel(post)

	try {
		await newPost.save()

		res.status(201).json(newPost)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const updatePost = async (req, res) => {
	try {
		const { title, message, creator, tags, imgBase64 } = req.body

		const updatedPost = await PostModel.findByIdAndUpdate(
			req.params.id,
			{ title, message, creator, tags, imgBase64 },
			{ new: true }
		)

		res.status(200).json(updatedPost)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const likePost = asyncHandler(async (req, res) => {
	const { postId, userId } = req.params
	if (!postId) throw new Error('no postId provided')
	if (!userId) throw new Error('no userId provided')
	const post = await PostModel.findById(postId)
	console.log('old likes', post.likes)
	console.log('userId', userId)
	post.likes.push(userId)
	console.log('new likes with pushed userId', post.likes)

	await PostModel.findByIdAndUpdate(
		postId,
		{ likes: post.likes.filter((like) => like.match(/[a-zA-Z0-9]/g)) },
		{ new: true }
	)
	console.log('new likes', post.likes)
	res.status(200).json(post.likes)
})

export const unlikePost = asyncHandler(async (req, res) => {
	const { postId, userId } = req.params
	if (!postId) throw new Error('no postId provided')
	if (!userId) throw new Error('no userId provided')
	const post = await PostModel.findById(postId)
	console.log('old likes', post.likes)
	console.log('userId', userId)

	const newLikes = post.likes.filter((likerId) => likerId !== userId)
	await PostModel.findByIdAndUpdate(
		postId,
		{ likes: newLikes },
		{ new: true }
	)
	console.log('new likes', newLikes)
	res.status(200).json(newLikes)
})

export const deletePost = async (req, res) => {
	const post = await PostModel.findById(req.params.id)

	await PostModel.findByIdAndDelete(req.params.id)

	res.status(200).json(post._id)
}

export const searchPosts = asyncHandler(async (req, res) => {
	const { query, tags } = req.query

	if (!query && !tags) throw new Error('no query params provided')

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

	res.status(200).json(queriedPosts)
})
