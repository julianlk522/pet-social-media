import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import { Container } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Auth from './components/Auth'
import PostDetails from './components/PostDetails'
// svg background source: https://bgjar.com/cloudy
import bgSvg from './assets/bg.svg'

function App() {
	return (
		<Router>
			<ToastContainer />
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
