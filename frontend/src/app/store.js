import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice.js'
import userReducer from '../features/users/userSlice.js'

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        user: userReducer,
    }
})