import { memo } from 'react'
import { useTheme } from '@mui/material'

import { Avatar, Icon } from '../../components'

export const Login = memo(() => {
  const theme = useTheme()

  return (
    <div>
      <Icon
        iconName="Home"
        iconSize={32}
        iconColor={theme.palette.green.dark}
      />
      <Avatar avatarSize={4} src="https://mui.com/static/images/avatar/2.jpg" />
    </div>
  )
})

Login.displayName = 'Login'

export default Login
