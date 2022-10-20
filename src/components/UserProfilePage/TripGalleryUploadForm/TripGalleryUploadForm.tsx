import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined'
import { styled, useTheme } from '@mui/material'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { tripGallerySelectors } from 'src/store/reducers/tripGallerySlice'
import { ITripImage } from 'src/types'

import { TripImageCard } from './TripImageCard'

export interface ITripGalleryUploadFormProps {}

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

export const TripGalleryUploadForm: FC<ITripGalleryUploadFormProps> = () => {
  const tripGallery = useSelector(tripGallerySelectors.selectAll)
  const theme = useTheme()

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      const newTripGallery: ITripImage[] = []

      Promise.all(
        files.map(async (file) => {
          const imageDataUrl = (await readFile(file)) as string
          newTripGallery.push({
            tripImageId: newTripGallery.length + 1,
            src: imageDataUrl,
            backgroundInfo: ''
          })
        })
      ).catch((err) => {
        console.log(err.message)
      })
    }
  }

  return (
    <div className="flex flex-col">
      <span className="font-bold text-lg leading-6 mb-1">Trip Gallery</span>
      <span className="text-xs leading-4 text-green-500 mb-3">
        Upload a maximum of 5 photos now. After saving, you can upload an
        unlimited number in your Trip Gallery link
      </span>
      {tripGallery.length > 0 ? (
        <div className="flex flex-col gap-y-4">
          {tripGallery?.map((tripImage, index) => (
            <TripImageCard key={index} tripImage={tripImage} />
          ))}
        </div>
      ) : (
        <label htmlFor="File-Upload-Travel-Log-Trip-Gallery">
          <Input
            id="File-Upload-Travel-Log-Trip-Gallery"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            multiple
          />
          <div className="flex flex-col gap-y-1 h-[117px] bg-green-100 rounded-lg items-center justify-center cursor-pointer">
            <CloudDownloadOutlinedIcon
              sx={{
                width: 44,
                height: 44,
                color: theme.palette.green.middle
              }}
            />
            <span className="font-bold text-lg leading-6 text-green-500">
              Upload Files
            </span>
          </div>
        </label>
      )}
    </div>
  )
}

TripGalleryUploadForm.displayName = 'TripGalleryUploadForm'

export default TripGalleryUploadForm
