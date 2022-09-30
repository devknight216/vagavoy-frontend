import { Box, styled } from '@mui/material'
import { FC, memo } from 'react'

import SideNavigationHeader from './SideNavigationHeader'
import SideNavigationOptions from './SideNavigationOptions'

export interface ISideNavigationProps {
  /**
   * Login Status
   */
  loggedIn: boolean
  /**
   * Function fired when the close Icon clicked
   */
  onCloseSideNavigation: () => void
}

const SideNavigationContainer = styled(Box)(() => ({
  width: '100%'
}))

export const SideNavigation: FC<ISideNavigationProps> = memo(
  ({ loggedIn = false, onCloseSideNavigation }: ISideNavigationProps) => {
    return (
      <SideNavigationContainer>
        <SideNavigationHeader onCloseSideNavigation={onCloseSideNavigation} />
        <SideNavigationOptions loggedIn={loggedIn} />
      </SideNavigationContainer>
    )
  }
)

SideNavigation.displayName = 'SideNavigation'

export default SideNavigation
