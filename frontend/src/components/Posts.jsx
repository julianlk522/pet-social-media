import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPaginatedPosts, getPosts } from '../features/posts/postsSlice.js'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Post from './Post.jsx'
import { CircularProgress, Grid, Box } from '@mui/material'

function Posts({ setCurrentPostId, page }) {
	const dispatch = useDispatch()
	const isLoading = useSelector((state) => state.posts.isLoading)
	const posts = useSelector((state) => state.posts.postsArray)

	const { loggedIn, loggedInUser } = useAuthStatus()

	const [featuresDisabled, setFeaturesDisabled] = useState(true)

	//	fetch post data on load
	useEffect(() => {
		page ? dispatch(getPaginatedPosts({ page })) : dispatch(getPosts())
	}, [dispatch, page])

	//	revoke editing privileges when not signed in
	useEffect(() => {
		if (!loggedIn) setFeaturesDisabled(true)
	}, [loggedIn])

	return isLoading ? (
		<Box
			sx={{
				display: 'flex',
				height: '50%',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CircularProgress color='secondary' />
		</Box>
	) : posts.length ? (
		<Grid container alignItems='stretch' spacing={3}>
			{posts.map((post) => (
				<Grid item key={post._id} xs={12} md={6}>
					<Post
						post={post}
						setCurrentPostId={setCurrentPostId}
						featuresDisabled={featuresDisabled}
						loggedInUser={loggedInUser}
					/>
				</Grid>
			))}
		</Grid>
	) : (
		<Box
			sx={{
				display: 'flex',
				height: '50%',
				justifyContent: 'center',
				alignItems: 'center',
				color: 'white',
			}}
		>
			<h3>Seems there are no posts that match your search! Sorry...</h3>
		</Box>
	)
}

export default Posts
