import React from 'react'
import Navbar1 from '../components/navbar'
import { Typography, Box } from '@mui/material'

const Homepage = () => {
  return (
    <div>
      <Navbar1 />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom className='text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight'>
          Welcome to BuySell@IIITH
        </Typography>
        <Typography variant="body1" className='text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic suscipit repudiandae numquam quis sapiente culpa 
        </Typography>
        <Typography variant="body1" className='text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight'>
           reprehenderit debitis sit odio, doloremque velit architecto, nobis non repellendus nostrum ad quo, pariatur quaerat?
        </Typography>
      </Box>
    </div>
  )
}

export default Homepage