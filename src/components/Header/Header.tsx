/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logout } from '@mui/icons-material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import {
  Box as MuiBox,
  Divider,
  Drawer as MuiDrawer,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { FC, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks'

import {
  Avatar,
  Button,
  Icon,
  Logo,
  NavigationOption,
  SideNavigation,
  TextField
} from '../index'

const TopNavigationContainer = styled(MuiBox)(({ theme }) => ({
  width: '100%',
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 6),
  [theme.breakpoints.down('xl')]: {
    columnGap: theme.spacing(7.5)
  },
  [theme.breakpoints.down('sm')]: {
    height: 60,
    columnGap: theme.spacing(4)
  }
}))

const LeftContainer = styled(MuiBox, {
  shouldForwardProp: (propName) => propName !== 'loggedIn'
})<{ loggedIn: boolean }>(({ theme }) => ({
  padding: theme.spacing(1, 0),
  display: 'flex',
  flexDirection: 'row',

  alignItems: 'center',
  justifyContent: 'flex-start',

  [theme.breakpoints.down('xl')]: {
    columnGap: theme.spacing(4),
    width: '100%'
  },
  [theme.breakpoints.up('xl')]: {
    columnGap: theme.spacing(14.5),
    width: 'fit-content'
  }
}))

const RightContainer = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%'
}))

export interface IHeaderProps {
  onLogin: () => void
  onSignup: () => void
}

export const Header: FC<IHeaderProps> = memo(({ onLogin, onSignup }) => {
  const theme = useTheme()
  const [openSidebar, setOpenSidebar] = useState(false)

  const { user, isAuthorized } = useAuth()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const upLG = useMediaQuery(theme.breakpoints.up('xl'))
  const upSM = useMediaQuery(theme.breakpoints.up('sm'))
  const downSM = useMediaQuery(theme.breakpoints.down('sm'))

  const auth = useAuth()

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <TopNavigationContainer>
      <LeftContainer loggedIn={isAuthorized}>
        <Logo logoFull={upSM} sx={{ marginTop: upSM ? '-6px' : '4px' }} />
        <TextField
          textFieldHeight={40}
          textFieldLeftIconName="Search"
          placeholder="Search..."
          sx={{ width: upLG ? '370px' : '100%', maxWidth: 370 }}
        />
      </LeftContainer>
      <RightContainer
        sx={{
          columnGap: isAuthorized ? theme.spacing(5.25) : theme.spacing(11)
        }}>
        {isAuthorized ? (
          <>
            {upLG && (
              <NavigationOption
                navigationOptionLabel="Home"
                navigationOptionLink="/"
                navigationOptionIconName="Home"
              />
            )}
            {upSM && (
              <>
                <NavigationOption
                  navigationOptionLabel="Connections"
                  navigationOptionLink="connections"
                  navigationOptionIconName="Users"
                />
                <NavigationOption
                  navigationOptionLabel="News"
                  navigationOptionLink="news"
                  navigationOptionIconName="Join"
                />
                <NavigationOption
                  navigationOptionLabel="Messages"
                  navigationOptionLink="messages"
                  navigationOptionIconName="Message"
                />
                <div
                  className="cursor-pointer"
                  onClick={handleAvatarClick}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}>
                  {user.profileImage ? (
                    <Avatar
                      size={40}
                      src={'https://mui.com/static/images/avatar/5.jpg'}
                    />
                  ) : (
                    <AccountCircleOutlinedIcon className="text-green-700 w-[40px] h-[40px]" />
                  )}
                </div>
              </>
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0
                  }
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              <MenuItem onClick={() => navigate(`/profile/${user.id}`)}>
                <span className="text-green-700 font-semibold">Edit Profile</span>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  auth.signout()
                  navigate('/')
                }}>
                <ListItemIcon>
                  <Logout fontSize="small" className="text-green-700" />
                </ListItemIcon>
                <span className="text-green-700 font-semibold">Logout</span>
              </MenuItem>
            </Menu>
          </>
        ) : (
          upSM && (
            <div className="flex lg:gap-x-11 gap-4">
              <Button
                variant="text"
                buttonFontBold={true}
                buttonLabel="Join Now"
                onClick={() => onSignup()}
              />
              <Button
                variant="text"
                buttonFontBold={true}
                buttonLabel="Sign In"
                onClick={() => onLogin()}
              />
            </div>
          )
        )}

        {downSM && (
          <Icon
            iconName="Hamburger"
            iconColor={theme.palette.green.dark}
            onClick={() => setOpenSidebar(true)}
            className="cursor-pointer"
          />
        )}
      </RightContainer>
      <MuiDrawer
        anchor="right"
        open={openSidebar && downSM}
        sx={{
          '& .MuiPaper-root': {
            width: '100%'
          }
        }}
        onClose={() => setOpenSidebar(false)}>
        <SideNavigation
          onCloseSideNavigation={() => setOpenSidebar(false)}
          onLogin={onLogin}
          onSignup={onSignup}
        />
      </MuiDrawer>
    </TopNavigationContainer>
  )
})

Header.displayName = 'Header'

export default Header
