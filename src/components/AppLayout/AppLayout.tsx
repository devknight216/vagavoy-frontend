import { Box } from '@mui/material'
import { AxiosError } from 'axios'
import React, { memo, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth, useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { updateProfile } from 'src/store/reducers/accountSlice'
import { useAppDispatch } from 'src/store/store'

import LoginModal from '../Auth/Login'
import SignUpModal from '../Auth/SignUp'
import { Header } from '../index'

export const AppLayout = memo(() => {
  const [login, setLogin] = React.useState(false)
  const [signup, setSignup] = React.useState(false)
  const { user } = useAuth()
  const { showToast } = useToast()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const userId = user.id
    console.log(userId)
    if (userId) {
      axiosInstance
        .get(`${process.env.REACT_APP_API_URL}/user/${userId}`)
        .then((res) => {
          dispatch(updateProfile(res.data))
        })
        .catch((err: AxiosError) => {
          showToast({
            type: 'error',
            message: err.response?.data
          })
        })
    }
  }, [user])
  return (
    <div className="w-full flex flex-col bg-[#F5F5F5]">
      <div className="w-full mx-auto xl:max-w-[1200px]">
        <Header
          onLogin={() => setLogin(true)}
          onSignup={() => setSignup(true)}
        />
      </div>

      <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <Outlet />
      </Box>
      <LoginModal open={login} onClose={() => setLogin(false)} />
      <SignUpModal open={signup} onClose={() => setSignup(false)} />
    </div>
  )
})

AppLayout.displayName = 'AppLayout'

export default AppLayout
