import React, {useState} from 'react'
import Posts from './Posts.jsx'
import Form from './Form.jsx'
import {Grid} from '@mui/material'

function Home() {
    const [currentPostId, setCurrentPostId] = useState(null)
    
    return (
        <Grid 
            container 
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
        >
            <Grid
                item 
                xs={12}
                sm={7}
            >
                <Posts 
                    setCurrentPostId={setCurrentPostId}
                />
            </Grid>

            <Grid
                item 
                xs={12}
                sm={4}
            >
                <Form 
                    currentPostId={currentPostId} 
                    setCurrentPostId={setCurrentPostId}
                />
            </Grid>
        </Grid>
    )
}

export default Home