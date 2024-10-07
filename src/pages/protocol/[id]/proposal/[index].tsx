import Navbar from '@/components/Navbar'
import ProposalDashboard from '@/components/ProposalDashboard'
import { Box } from '@chakra-ui/react'
import React from 'react'

const Index = () => {
  return (
    <Box>
      <Navbar/>
      <ProposalDashboard/>
    </Box>
  )
}

export default Index