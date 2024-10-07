import CreateSpaceDashboard from '@/components/CreateSpaceDashboard'
import Navbar from '@/components/Navbar'
import { Box } from '@chakra-ui/react'
import React from 'react'

const index = () => {
  return (
    <Box>
        <Navbar/>
        <CreateSpaceDashboard/>
    </Box>
  )
}

export default index