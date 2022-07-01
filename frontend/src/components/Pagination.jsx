import React from 'react'
import { Pagination } from '@mui/material/Pagination'
import { PaginationItem } from '@mui/material/PaginationItem'
import { NavLink } from 'react-router-dom'

export default function Pagination() {
	return (
		<Pagination
			count={5}
			page={1}
			color='secondary'
			renderItem={(item) => (
				<PaginationItem component={NavLink} to='/auth' {...item} />
			)}
		/>
	)
}
