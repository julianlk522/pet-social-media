import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper, Box } from '@mui/material'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthStatus } from '../hooks/useAuthStatus.js'
import { createPost, updatePost } from '../features/posts/postsSlice.js'

function Form({ currentPostId, setCurrentPostId }) {
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		imgBase64: '',
	})

	const dispatch = useDispatch()
	const { loggedIn, loggedInUser } = useAuthStatus()
	const currentPost = useSelector((state) =>
		currentPostId
			? state.posts.postsArray.find((post) => post._id === currentPostId)
			: null
	)

	useEffect(() => {
		currentPost && setPostData(currentPost)
	}, [currentPost])

	const handleSubmit = (e) => {
		e.preventDefault()

		const updatedPostData = {
			...postData,
			creator: loggedInUser.name,
		}

		if (currentPostId) {
			dispatch(updatePost({ currentPostId, updatedPostData }))
		} else {
			dispatch(createPost(updatedPostData))
		}
		handleClear()
	}

	const handleClear = () => {
		setCurrentPostId(null)
		setPostData({
			title: '',
			message: '',
			tags: [],
			imgBase64: '',
		})
	}

	return !loggedIn ? (
		<Paper
			elevation={6}
			sx={{
				mb: 2,
				p: 2,
				borderRadius: 4,
			}}
		>
			<Typography variant='h6' align='center'>
				Sign in to share your pet's greatest moments!
			</Typography>
		</Paper>
	) : (
		<Paper
			elevation={6}
			sx={{
				mb: 2,
				p: 2,
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
			}}
		>
			<form autoComplete='off' noValidate onSubmit={handleSubmit}>
				<Typography
					variant='h6'
					align='center'
					sx={{
						mt: 2,
					}}
				>
					{currentPostId ? 'Edit your ' : 'Make a New '}Post
				</Typography>
				<TextField
					margin='normal'
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={(e) =>
						setPostData({
							...postData,
							title: e.target.value,
						})
					}
				/>
				<TextField
					margin='normal'
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={postData.message}
					onChange={(e) =>
						setPostData({
							...postData,
							message: e.target.value,
						})
					}
				/>
				<TextField
					margin='normal'
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({
							...postData,
							tags: e.target.value.split(','),
						})
					}
				/>

				<Box
					sx={{
						width: '90%',
						my: 1,
					}}
				>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({
								...postData,
								imgBase64: base64,
							})
						}
					/>
				</Box>

				<Button
					variant='contained'
					size='large'
					type='submit'
					fullWidth
					sx={{
						my: 1,
					}}
				>
					Submit
				</Button>

				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={handleClear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	)
}

export default Form
