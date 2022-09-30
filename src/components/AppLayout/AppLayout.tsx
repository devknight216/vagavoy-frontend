import { Box } from '@mui/material'
import { memo } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../index'

export const AppLayout = memo(() => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full mx-auto lg:max-w-[1200px]">
        <Header />
      </div>

      <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <Outlet />
      </Box>
    </div>
  )
})

AppLayout.displayName = 'AppLayout'

export default AppLayout
