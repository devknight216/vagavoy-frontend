import { Box } from '@mui/material'
import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'

import LoginModal from '../Auth/Login'
import { Header } from '../index'

export const AppLayout = memo(() => {
  const [login, setLogin] = React.useState(false)
  return (
    <div className="w-full flex flex-col bg-[#F5F5F5]">
      <div className="w-full mx-auto xl:max-w-[1200px] bg-white">
        <Header onLogin={() => setLogin(true)} />
      </div>

      <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <Outlet />
      </Box>
      <LoginModal open={login} onClose={() => setLogin(false)} />
    </div>
  )
})

AppLayout.displayName = 'AppLayout'

export default AppLayout
