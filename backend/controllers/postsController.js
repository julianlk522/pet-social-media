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

export const likePost = async (req, res) => {
	try {
		const post = await PostModel.findById(req.params.postId)

		post.likes.push(req.params.userId)
		post.save()

		res.status(200).json(post)

		// if (!req.params.userId || !req.params.postId) {
		//     res.status(400).json({error: 'error: one or both params not provded'})
		// }

		// if (post.likes.includes(req.params.userId)) {
		//     post.likes = post.likes.filter(likerId => {
		//         likerId !== req.params.userId
		//     })
		//     await post.save()
		//     res.status(200).json(post)
		// } else {
		//     post.likes.push(req.params.userId)
		//     await post.save()
		//     res.status(200).json(post)
		// }
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

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
