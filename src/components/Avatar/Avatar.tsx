import { styled } from '@mui/material/styles'

interface AvatarProps {
  size?: number
  borderWidth?: number
  src: string
}

export const Avatar = styled('img')<AvatarProps>(({ size, borderWidth }) => ({
  width: size,
  height: size,
  borderRadius: '100%',
  borderColor: 'white',
  borderWidth
}))

Avatar.displayName = 'Avatar'

export default Avatar
