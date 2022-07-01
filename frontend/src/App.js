import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import { Container } from '@mui/material'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Auth from './components/Auth.jsx'
import PostDetails from './components/PostDetails.jsx'
// svg background source: https://bgjar.com/cloudy
import bgSvg from './assets/bg.svg'

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
						exact
						path='/'
						element={<Navigate to='/posts' replace={true} />}
					/>
					<Route exact path='/posts' element={<Home />} />
					<Route exact path='/posts/:id' element={<PostDetails />} />
					<Route exact path='/auth' element={<Auth />} />
				</Routes>
			</Container>
		</Router>
	)
}

export default App
