import { Typography, useTheme } from '@mui/material'
import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Icon } from '../index'

export interface INavigationOptionProps {
  /**
   * Navigation Option Direction
   */
  navigationOptionDirection?: 'row' | 'column'
  /**
   * Navigation Option IconName
   */
  navigationOptionIconName: string
  /**
   * Navigation Option Label
   */
  navigationOptionLabel: string
  /**
   * Navigation Option Link
   */
  navigationOptionLink: string
}

export const NavigationOption: FC<INavigationOptionProps> = memo(
  ({
    navigationOptionDirection = 'column',
    navigationOptionIconName,
    navigationOptionLabel,
    navigationOptionLink,
    ...props
  }: INavigationOptionProps) => {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
      <>
        {navigationOptionDirection === 'column' ? (
          <div
            className="flex flex-col gap-y-0.5 justify-center items-center cursor-pointer"
            onClick={() => navigate(navigationOptionLink)}
            {...props}>
            <Icon
              iconName={navigationOptionIconName}
              iconColor={theme.palette.green.dark}
            />
            <Typography
              sx={{ fontSize: 12, lineHeight: '18px', fontWeight: 400, color: theme.palette.green.dark }}>
              {navigationOptionLabel}
            </Typography>
          </div>
        ) : (
          <div
            className="flex flex-row gap-x-[11px] cursor-pointer items-center"
            onClick={() => navigate(navigationOptionLink)}
            {...props}>
            <Icon
              iconName={navigationOptionIconName}
              iconColor={theme.palette.green.dark}
            />
            <Typography
              sx={{ fontSize: 18, lineHeight: '24px', fontWeight: 400, color: theme.palette.green.dark }}>
              {navigationOptionLabel}
            </Typography>
          </div>
        )}
      </>
    )
  }
)

NavigationOption.displayName = 'NavigationOption'

export default NavigationOption
