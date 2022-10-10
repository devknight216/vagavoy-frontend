import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined'
import { styled, Typography, useTheme } from '@mui/material'
import { FC, memo, useState } from 'react'

export interface IBannerImageProps {
  /**
   * Banner Image
   */
  bannerImage?: string
  /**
   * Current User
   */
  currentUser?: boolean
}

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

export const BannerImage: FC<IBannerImageProps> = memo(
  ({ bannerImage = '', currentUser = true }: IBannerImageProps) => {
    const theme = useTheme()
    const [newBannerImage, setNewBannerImage] = useState(bannerImage)

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        const imageDataUrl = (await readFile(file)) as string
        setNewBannerImage(imageDataUrl)
      }
    }

    return (
      <>
        <div className="bg-green-300 flex items-center justify-center w-full min-h-[100px] h-auto sm:h-[200px] xl:h-[300px]">
          {newBannerImage && (
            <img
              src={newBannerImage}
              className="w-full min-h-[100px] h-auto sm:h-[200px] xl:h-[300px] object-cover object-[100%_50%]"
            />
          )}
          <div className={newBannerImage ? 'hidden' : 'block'}>
            {currentUser && (
              <label htmlFor="contained-button-file">
                <Input
                  id="contained-button-file"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
                <span className="flex flex-col cursor-pointer items-center justify-center">
                  <CloudDownloadOutlinedIcon
                    sx={{
                      width: 44,
                      height: 44,
                      color: theme.palette.green.dark
                    }}
                  />
                  <Typography className="text-[28px] leading-6 font-semibold">
                    Add Your Banner Photo
                  </Typography>
                  <Typography className="text-[14px] leading-[21px] text-green-700">
                    Recomended size 1600x300 px
                  </Typography>
                </span>
              </label>
            )}
          </div>
        </div>
      </>
    )
  }
)

BannerImage.displayName = 'BannerImage'

export default BannerImage
