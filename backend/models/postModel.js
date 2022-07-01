import mongoose from "mongoose"
const {Schema} = mongoose

const postSchema = new Schema({
    title: String,
    message: String,
    creator: String,
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