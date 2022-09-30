import { Button } from '@mui/material'
import React from 'react'
import LoginModal from 'src/components/Auth/Login'

const UserProfile: React.FC = () => (
  <div>
    <Button onClick={() => {}}>Login</Button>
    <LoginModal open={true} onClose={() => {}} />
  </div>
)

export default UserProfile
