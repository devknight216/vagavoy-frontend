import { Typography, useTheme } from '@mui/material'
import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Divider, Icon } from '../../index'

export interface ISideNavigationOptionsProps {
  /**
   * Login Status
   */
  loggedIn: boolean
}

export const SideNavigationOptions: FC<ISideNavigationOptionsProps> = memo(
  ({ loggedIn }: ISideNavigationOptionsProps) => {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
      <div className="flex flex-col border-green-10 shadow-3xl px-2">
        {!loggedIn && (
          <div className="pl-2.5">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 28,
                lineHeight: '24px',
                color: 'black',
                marginTop: 6.5
              }}>
              Welcome to Vagavoy!
            </Typography>
          </div>
        )}
        <Divider sx={{ margin: '19px 0px' }} />
        {!loggedIn && (
          <div className="flex flex-col mt-4.75 pl-2.5 gap-7">
            <div
              className="flex items-center gap-x-3.5 cursor-pointer"
              onClick={() => navigate('login')}>
              <Icon
                iconName="Users"
                iconSize={30}
                iconColor={theme.palette.green.dark}
              />
              <Typography
                sx={{
                  color: theme.palette.green.dark,
                  fontWeight: 700,
                  fontSize: 22,
                  lineHeight: '24px'
                }}>
                Sign In
              </Typography>
            </div>
            <div
              className="flex items-center gap-x-3.5 cursor-pointer"
              onClick={() => navigate('signup')}>
              <Icon
                iconName="Join"
                iconSize={30}
                iconColor={theme.palette.green.dark}
              />
              <Typography
                sx={{
                  color: theme.palette.green.dark,
                  fontWeight: 700,
                  fontSize: 22,
                  lineHeight: '24px'
                }}>
                Join Now
              </Typography>
            </div>
          </div>
        )}
      </div>
    )
  }
)

SideNavigationOptions.displayName = 'SideNavigationOptions'

export default SideNavigationOptions
