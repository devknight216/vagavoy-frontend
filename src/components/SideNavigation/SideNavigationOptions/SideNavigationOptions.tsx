import { Typography, useTheme } from '@mui/material'
import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks'

import { Avatar, Divider, Icon, NavigationOption } from '../../index'

export interface ISideNavigationOptionsProps {
  onCloseSideNavigation: () => void
  onLogin: () => void
  onSignup: () => void
}

export const SideNavigationOptions: FC<ISideNavigationOptionsProps> = memo(
  ({
    onCloseSideNavigation,
    onLogin,
    onSignup
  }: ISideNavigationOptionsProps) => {
    const theme = useTheme()
    const { user, isAuthorized } = useAuth()
    const navigate = useNavigate()

    return (
      <div className="flex flex-col border-green-10 shadow-3xl px-4">
        {!isAuthorized && (
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
        {isAuthorized && (
          <div
            className="flex flex-row gap-x-3 items-center mt-[26px] ml-[18px] mb-[26px] cursor-pointer"
            onClick={() => {
              navigate(`/profile/${user.id}`)
              onCloseSideNavigation()
            }}>
            <Avatar
              size={60}
              src="https://mui.com/static/images/avatar/1.jpg"
            />
            <div className="flex flex-col gap-y-1">
              <Typography className="text-lg leading-6 font-bold text-green-700">
                {user.name}
              </Typography>
              <Typography className="text-xs leading-[15px] text-green-700">
                500+ connections
              </Typography>
            </div>
          </div>
        )}
        <Divider />
        {!isAuthorized ? (
          <div className="flex flex-col mt-[19px] pl-2.5 gap-7">
            <div
              className="flex items-center gap-x-3.5 cursor-pointer"
              onClick={() => {
                onLogin()
                onCloseSideNavigation()
              }}>
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
              onClick={() => {
                onSignup()
                onCloseSideNavigation()
              }}>
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
          <div className="flex flex-col mt-[25px] gap-y-6 items-start">
            <NavigationOption
              navigationOptionDirection="row"
              navigationOptionLabel="Connections"
              navigationOptionLink="connections"
              navigationOptionIconName="Users"
              onCloseSideNavigation={onCloseSideNavigation}
            />
            <NavigationOption
              navigationOptionDirection="row"
              navigationOptionLabel="News"
              navigationOptionLink="news"
              navigationOptionIconName="Join"
              onCloseSideNavigation={onCloseSideNavigation}
            />
            <NavigationOption
              navigationOptionDirection="row"
              navigationOptionLabel="Messages"
              navigationOptionLink="messages"
              navigationOptionIconName="Message"
              onCloseSideNavigation={onCloseSideNavigation}
            />
          </div>
        )}
      </div>
    )
  }
)

SideNavigationOptions.displayName = 'SideNavigationOptions'

export default SideNavigationOptions
