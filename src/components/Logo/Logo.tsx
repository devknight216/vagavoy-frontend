import {
  Box as MuiBox,
  BoxProps as MuiBoxProps,
  styled,
  useTheme
} from '@mui/material'
import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as Full } from '../../assets/logo/full.svg'
import { ReactComponent as Mark } from '../../assets/logo/mark.svg'

export interface ILogoProps extends MuiBoxProps {
  /**
   * Show Mark
   */
  logoFull?: boolean
}

const LogoContainer = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: theme.spacing(3),
  '&:hover': {
    cursor: 'pointer'
  }
}))

export const Logo: FC<ILogoProps> = memo(
  ({ logoFull = true, ...props }: ILogoProps) => {
    const theme = useTheme()
    const navigate = useNavigate()

    const handleLogoClick = () => navigate('/login')

    return (
      <LogoContainer {...props} onClick={handleLogoClick}>
        {logoFull ? (
          <Full
            color={theme.palette.mode === 'light' ? '#000000' : '#FFFFFF'}
          />
        ) : (
          <Mark />
        )}
      </LogoContainer>
    )
  }
)

Logo.displayName = 'Logo'

export default Logo
