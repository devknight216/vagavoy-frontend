import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined'
import { styled, Typography, useTheme } from '@mui/material'
import { FC, memo, useState } from 'react'
import EditButton from 'src/components/EditButton'
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
      <div className="bg-green-300 flex items-center justify-center w-full min-h-[100px] h-auto sm:h-[200px] xl:h-[300px] relative">
        {newBannerImage ? (
          <img
            src={newBannerImage}
            className="w-full min-h-[100px] h-[100px] sm:h-[200px] xl:h-[300px] object-cover object-[100%_50%]"
          />
        ) : (
          <></>
        )}
        <div className={newBannerImage ? 'hidden' : 'block'}>
          {currentUser && (
            <label htmlFor="File-Upload-BannerImage">
              <Input
                id="File-Upload-BannerImage"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
              <div className="sm:flex flex-col cursor-pointer items-center justify-center hidden">
                <CloudDownloadOutlinedIcon
                  sx={{
                    width: 44,
                    height: 44,
                    color: theme.palette.green.dark
                  }}
                />
                <Typography className="text-[28px] leading-6 font-semibold mt-[21px]">
                  Add Your Banner Photo
                </Typography>
                <Typography className="text-[14px] leading-[21px] text-green-700 mt-2">
                  Recomended size 1600x300 px
                </Typography>
              </div>
              <span className="flex flex-col cursor-pointer items-center justify-center sm:hidden">
                <div className="flex flex-row gap-x-2">
                  <CloudDownloadOutlinedIcon
                    sx={{
                      color: theme.palette.green.dark
                    }}
                  />
                  <Typography className="text-[18px] leading-6 font-bold">
                    Add Your
                  </Typography>
                </div>
                <Typography className="text-[18px] leading-6 font-bold ml-6 mt-1">
                  Banner Photo
                </Typography>
              </span>
            </label>
          )}
        </div>
        {newBannerImage && currentUser && (
          <label
            htmlFor="File-Upload-BannerImage"
            className="w-fit absolute xl:bottom-[13px] xl:right-[calc((100%-1176px)/2)] sm:top-8 sm:right-8 top-5 right-5">
            <div className="flex-col items-center justify-center cursor-pointer">
              <EditButton />
            </div>
          </label>
        )}
      </div>
    )
  }
)

BannerImage.displayName = 'BannerImage'

export default BannerImage
