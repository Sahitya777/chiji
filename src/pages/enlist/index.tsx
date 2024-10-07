import EnlistDashboard from '@/components/EnlistDashboard'
import Navbar from '@/components/Navbar'
import { Box } from '@chakra-ui/react'
import React from 'react'

const index = () => {
  return (
    <Box>
        <Navbar/>
        <EnlistDashboard/>
    </Box>
  )
}

export default index