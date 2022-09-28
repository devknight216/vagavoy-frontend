import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { FC, memo, useMemo } from 'react'

const avatarSizeMapping = [24, 44, 60, 92, 124, 260]

const CustomAvatar = styled(MuiAvatar)(({ theme }) => ({
  background: theme.palette.grey[300],
  fontFamily: 'Inter',
  lineHeight: '16px',
  letterSpacing: '0.4px',
  color: 'black',
  cursor: 'pointer'
}))

export interface IAvatarProps extends MuiAvatarProps {
  /**
   * Avatar size
   */
  avatarSize?: number
}

export const Avatar: FC<IAvatarProps> = memo(
  ({ avatarSize = 1, ...props }: IAvatarProps) => {
    const currentAvatarSize = useMemo(
      () => avatarSizeMapping[avatarSize - 1],
      [avatarSize]
    )

    return (
      <CustomAvatar
        {...props}
        sx={{
          width: currentAvatarSize,
          height: currentAvatarSize,
          ...props.sx
        }}
      />
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar
