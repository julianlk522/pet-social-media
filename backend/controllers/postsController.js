import mongoose from 'mongoose'
import PostModel from '../models/postModel.js'

export const getPosts = async (req, res) => {
	try {
		const fetchedPosts = await PostModel.find()
		res.status(200).json(fetchedPosts)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

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
		const post = await PostModel.findById(req.params.id)

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
