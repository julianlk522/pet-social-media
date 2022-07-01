import React, { useState } from 'react'
import { useHistory, useLocation, NavLink } from 'react-router-dom'
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
} from '@mui/material'

function Home() {
	const [currentPostId, setCurrentPostId] = useState(null)
	const [searchTags, setSearchTags] = useState([])

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
				<AppBar
					position='static'
					color='inherit'
					sx={{
						borderRadius: 1,
						mb: 2,
						display: 'flex',
						p: 2,
					}}
				>
					<TextField name='search' label='Search Posts' fullWidth />
				</AppBar>

				<Paper
					sx={{
						display: 'flex',
						justifyContent: 'center',
						p: 1,
						mb: 2,
					}}
				>
					<Autocomplete
						fullWidth
						multiple
						id='tagsSearch'
						options={[]}
						defaultValue={[]}
						freeSolo
						size='small'
						onChange={(e, value) => {
							e.preventDefault()
							setSearchTags(value)
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
									label='Search Tags'
									placeholder='e.g. Dogs'
								/>
							)
						}}
					/>
				</Paper>

				<Paper
					elevation={6}
					sx={{
						mb: 2,
						p: 2,
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
				<Form
					currentPostId={currentPostId}
					setCurrentPostId={setCurrentPostId}
				/>
			</Grid>
		</Grid>
	)
}

export default Home
