import React, { Dispatch, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks/rtkHooks'
import { getPaginatedPosts, getPosts } from '../features/posts/postsSlice'
import { useAuthStatus } from '../app/hooks/useAuthStatus'
import Post from './Post'
import { CircularProgress, Grid, Box } from '@mui/material'

type PostsProps = {
	setCurrentPostId: Dispatch<any>
	page: string
}

function Posts({ setCurrentPostId, page }: PostsProps) {
	const dispatch = useAppDispatch()
	const isLoading = useAppSelector((state) => state.posts.isLoading)
	const posts = useAppSelector((state) => state.posts.postsArray)

	const { loggedIn, loggedInUser } = useAuthStatus()

	const [featuresDisabled, setFeaturesDisabled] = useState(true)

	//	fetch post data on load
	useEffect(() => {
		page ? dispatch(getPaginatedPosts({ page })) : dispatch(getPosts())
	}, [dispatch, page, posts.length])

	//	check if signed in, if so grant editing privileges
	useEffect(() => {
		if (loggedIn) setFeaturesDisabled(false)
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
