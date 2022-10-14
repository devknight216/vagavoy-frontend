import { Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { FC, memo, useState } from 'react'
import { EditButton, Icon } from 'src/components'

interface IAvatarProps {
  size?: number
  borderWidth?: number
  src?: string
  className?: string
  currentUser?: boolean
}

const CustomAvatar = styled('img')<IAvatarProps>(({ size, borderWidth }) => ({
  width: size,
  height: size,
  borderRadius: '100%',
  borderColor: 'white',
  borderWidth
}))

const Input = styled('input')(() => ({
  display: 'none'
}))

const readFile = (file: Blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export const Avatar: FC<IAvatarProps> = memo(
  ({ src = '', size, borderWidth, currentUser = false, className }) => {
    const theme = useTheme()
    const [avatarImage, setAvatarImage] = useState(src)

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        const imageDataUrl = (await readFile(file)) as string
        setAvatarImage(imageDataUrl)
      }
    }

    return (
      <div className="w-fit relative">
        {avatarImage && (
          <CustomAvatar
            src={avatarImage}
            size={size}
            borderWidth={borderWidth}
            className={className}
          />
        )}
        <div
          className={
            avatarImage
              ? 'hidden'
              : 'block' +
                ' rounded-full border-white flex items-center justify-center bg-green-100 ' +
                className
          }>
          {currentUser ? (
            <label htmlFor="File-Upload-Avatar">
              <Input
                id="File-Upload-Avatar"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
              <div className="flex-col items-center justify-center cursor-pointer">
                <Icon
                  iconName="Picture"
                  iconSize={44}
                  iconColor={theme.palette.green.middle}
                />
                <Typography className="text-lg leading-6 font-bold mt-3 text-green-500 xl:flex hidden">
                  Add Your Profile Picture
                </Typography>
              </div>
            </label>
          ) : (
            <Icon
              iconName="Picture"
              iconSize={44}
              iconColor={theme.palette.green.middle}
            />
          )}
        </div>
        {avatarImage && currentUser && (
          <label
            htmlFor="File-Upload-Avatar"
            className="w-fit absolute xl:bottom-3 xl:right-[38px] bottom-[0px] right-[0px]">
            <div className="flex-col items-center justify-center cursor-pointer">
              <EditButton />
            </div>
          </label>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar
