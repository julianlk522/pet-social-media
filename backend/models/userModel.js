import mongoose from 'mongoose'
const {Schema} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    idAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString(),
    },
})

const UserSchema = mongoose.model('User', userSchema)
export default UserSchema