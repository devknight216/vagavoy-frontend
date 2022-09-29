import { useTheme } from '@mui/material'
import { memo } from 'react'

import { Avatar, Button, Icon } from '../../components'

export const Login = memo(() => {
  const theme = useTheme()

  return (
    <div>
      <Icon
        iconName="Share"
        iconSize={32}
        iconColor={theme.palette.orange.dark}
      />
      <Avatar avatarSize={4} src="https://mui.com/static/images/avatar/2.jpg" />
      <Button
        variant="outlined"
        buttonRightIconName="Share"
        buttonFontBold={true}
        buttonLabel="Share Profile"
        sx={{
          width: '100%',
          backgroundColor: 'rgba(0, 51, 0, 0.1) !important',
          border: '1px solid rgba(0, 51, 0, 0.2) !important'
        }}
      />
    </div>
  )
})

Login.displayName = 'Login'

export default Login
