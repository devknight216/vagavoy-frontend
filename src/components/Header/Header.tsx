import {
  Box as MuiBox,
  Drawer as MuiDrawer,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { FC, memo, useState } from 'react'

// import { useNavigate } from 'react-rUper-dom'
import {
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
  padding: theme.spacing(4, 6),
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
  alignItems: 'center'
}))

export interface IHeaderProps {
  onLogin: () => void
  onSignup: () => void
}

export const Header: FC<IHeaderProps> = memo(({ onLogin, onSignup }) => {
  const theme = useTheme()
  const [openSidebar, setOpenSidebar] = useState(false)

  const loggedIn = true

  const upLG = useMediaQuery(theme.breakpoints.up('xl'))
  const upSM = useMediaQuery(theme.breakpoints.up('sm'))
  const downSM = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <TopNavigationContainer>
      <LeftContainer loggedIn={loggedIn}>
        <Logo logoFull={upSM} sx={{ marginTop: upSM ? '-6px' : '4px' }} />
        <TextField
          textFieldHeight={40}
          textFieldLeftIconName="Search"
          placeholder="Search..."
          sx={{ width: upLG ? '370px' : '100%', maxWidth: 370 }}
        />
      </LeftContainer>
      <RightContainer
        sx={{ columnGap: loggedIn ? theme.spacing(5.25) : theme.spacing(11) }}>
        {loggedIn ? (
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
                <NavigationOption
                  navigationOptionLabel="Profile"
                  navigationOptionLink="user-profile"
                  navigationOptionAvatarSrc="https://mui.com/static/images/avatar/1.jpg"
                />
              </>
            )}
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
          loggedIn={loggedIn}
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
