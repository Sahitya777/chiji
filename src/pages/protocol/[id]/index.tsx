import Navbar from '@/components/Navbar'
import ProjectDashboard from '@/components/ProjectDashboard'
import { Box } from '@chakra-ui/react'
import React from 'react'

const index = () => {
  return (
    <Box>
        <Navbar/>
        <ProjectDashboard/>
    </Box>
  )
}

export default index