import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchPosts } from '../features/posts/postsSlice.js'
import { NavLink } from 'react-router-dom'
import Posts from './Posts.jsx'
import Form from './Form.jsx'
import {
	Grid,
	Paper,
	Pagination,
	PaginationItem,
	AppBar,
	TextField,
	Chip,
	Autocomplete,
	Button,
} from '@mui/material'

function Home() {
	const [currentPostId, setCurrentPostId] = useState(null)
	const [searchTags, setSearchTags] = useState([])
	const [searchString, setSearchString] = useState('')
	const [currentSearchTag, setCurrentSearchTag] = useState('')
	const dispatch = useDispatch()

	return (
		<Grid
			container
			justifyContent='space-between'
			alignItems='stretch'
			spacing={3}
		>
			<Grid item xs={12} sm={6} md={9}>
				<Posts setCurrentPostId={setCurrentPostId} />
			</Grid>

			<Grid item xs={12} sm={6} md={3}>
				<Paper
					elevation={6}
					sx={{
						mb: 2,
						p: 2,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Pagination
						count={5}
						page={1}
						color='secondary'
						renderItem={(item) => (
							<PaginationItem
								component={NavLink}
								to='/auth'
								{...item}
							/>
						)}
					/>
				</Paper>
				<Paper
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						p: 2,
						mb: 2,
					}}
				>
					<AppBar
						position='static'
						color='inherit'
						sx={{
							borderRadius: 1,
							mb: 2,
							boxShadow: 'none',
						}}
					>
						<TextField
							name='search'
							label='Filter by post content'
							fullWidth
							value={searchString}
							onChange={(e) => {
								e.preventDefault()
								setSearchString(e.target.value)
							}}
						/>
					</AppBar>
					<Autocomplete
						multiple
						id='tagsSearch'
						options={[]}
						value={searchTags}
						inputValue={currentSearchTag}
						onInputChange={(e) => {
							setCurrentSearchTag(e.target.value)
						}}
						freeSolo
						size='small'
						onChange={(e, value) => {
							e.preventDefault()
							console.log(value)
							if (
								value.length &&
								value.some((tag) => !tag.trim())
							) {
								console.log('found whitespace')
								return
							}
							setSearchTags(value)
							setCurrentSearchTag('')
						}}
						renderTags={(value, getTagProps) =>
							value.map((option, idx) => (
								<Chip
									key={idx}
									variant='outlined'
									label={option}
									{...getTagProps({ idx })}
								/>
							))
						}
						renderInput={(params) => {
							return (
								<TextField
									{...params}
									variant='outlined'
									label='Filter by tags'
									placeholder='e.g. Dogs'
								/>
							)
						}}
					/>
					<Button
						onClick={(e) => {
							e.preventDefault()
							;(!searchString.trim().length &&
								!searchTags.length) ||
							searchString.match(/[^a-zA-Z\s']/)
								? console.log('nothing to see here folks')
								: searchString.trim().length &&
								  !searchTags.length
								? dispatch(
										searchPosts({
											query: searchString.trim(),
										})
								  )
								: dispatch(
										searchPosts({
											query: searchString.trim(),
											tags: searchTags,
										})
								  )
						}}
						sx={{
							mt: 2,
						}}
					>
						Search
					</Button>
				</Paper>
				<Form
					currentPostId={currentPostId}
					setCurrentPostId={setCurrentPostId}
				/>
			</Grid>
		</Grid>
	)
}

export default Home
