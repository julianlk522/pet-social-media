import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import { Container } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Auth from './components/Auth'
import PostDetails from './components/PostDetails'
// svg background source: https://bgjar.com/cloudy
const bgSvg = require('./assets/bg.svg') as string

function App() {
	return (
		<Router>
			<Container
				sx={{
					backgroundImage: `url(${bgSvg})`,
					position: 'absolute',
					top: '0',
					height: '100%',
					objectFit: 'cover',
					zIndex: -1,
				}}
				maxWidth={false}
			></Container>

			<Container maxWidth='xl'>
				<Navbar />
				<Routes>
					<Route
						path='/'
						element={<Navigate to='/posts' replace={true} />}
					/>
					<Route path='/posts' element={<Home />} />
					<Route path='/posts/page:page' element={<Home />} />
					<Route path='/posts/:id' element={<PostDetails />} />
					<Route path='/auth' element={<Auth />} />
				</Routes>
			</Container>
		</Router>
	)
}

export default App
