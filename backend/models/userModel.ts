import mongoose from 'mongoose'
const { Schema } = mongoose

interface User {
	name: string
	email: string
	password: string
	isAdmin: boolean
	createdAt: Date | string
}

const userSchema = new Schema<User>({
	name: {
		type: String,
		required: [true, 'Please add a name'],
	},
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: new Date().toISOString(),
	},
})

const UserSchema = mongoose.model('User', userSchema)
export default UserSchema
