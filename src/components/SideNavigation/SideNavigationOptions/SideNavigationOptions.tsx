import { Typography, useTheme } from '@mui/material'
import { FC, memo } from 'react'

import { Avatar, Divider, Icon, NavigationOption } from '../../index'

export interface ISideNavigationOptionsProps {
  /**
   * Login Status
   */
  loggedIn: boolean
  onLogin: () => void
  onSignup: () => void
}

export const SideNavigationOptions: FC<ISideNavigationOptionsProps> = memo(
  ({ loggedIn, onLogin, onSignup }: ISideNavigationOptionsProps) => {
    const theme = useTheme()

    return (
      <div className="flex flex-col border-green-10 shadow-3xl px-4">
        {!loggedIn && (
          <div className="pl-2.5">
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 28,
                lineHeight: '24px',
                color: 'black',
                marginTop: 6.5,
                marginBottom: '19px'
              }}>
              Welcome to Vagavoy!
            </Typography>
          </div>
        )}
        {loggedIn && (
          <div className="flex flex-row gap-x-3 items-center mt-[26px] ml-[18px] mb-[26px]">
            <Avatar
              size={60}
              src="https://mui.com/static/images/avatar/1.jpg"
            />
            <div className="flex flex-col gap-y-1">
              <Typography className="text-lg leading-6 font-bold text-green-700">
                Charlie Hummel
              </Typography>
              <Typography className="text-xs leading-[15px] text-green-700">
                500+ connections
              </Typography>
            </div>
          </div>
        )}
        <Divider />
        {!loggedIn ? (
          <div className="flex flex-col mt-[19px] pl-2.5 gap-7">
            <div
              className="flex items-center gap-x-3.5 cursor-pointer"
              onClick={() => onLogin()}>
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
              onClick={() => onSignup()}>
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
        ) : (
          <div className="flex flex-col mt-[25px] gap-y-6">
            <NavigationOption
              navigationOptionDirection="row"
              navigationOptionLabel="Connections"
              navigationOptionLink="connections"
              navigationOptionIconName="Users"
            />
            <NavigationOption
              navigationOptionDirection="row"
              navigationOptionLabel="News"
              navigationOptionLink="news"
              navigationOptionIconName="Join"
            />
            <NavigationOption
              navigationOptionDirection="row"
              navigationOptionLabel="Messages"
              navigationOptionLink="messages"
              navigationOptionIconName="Message"
            />
          </div>
        )}
      </div>
    )
  }
)

SideNavigationOptions.displayName = 'SideNavigationOptions'

export default SideNavigationOptions
