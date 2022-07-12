import mongoose, { Schema } from 'mongoose'

interface Post {
	title: string
	message: string
	creator: string
	tags?: [string]
	imgBase64?: string
	likes?: [string]
	createdAt: Date | string
}

const postSchema = new Schema<Post>({
	title: { type: String, required: [true, 'Please add a title'] },
	message: { type: String, required: [true, 'Please add a message'] },
	creator: { type: String, required: [true, 'Please add a creator'] },
	tags: [String],
	imgBase64: String,
	likes: [String],
	createdAt: {
		type: Date,
		default: new Date().toISOString(),
	},
})

const PostSchema = mongoose.model('Post', postSchema)

export default PostSchema
