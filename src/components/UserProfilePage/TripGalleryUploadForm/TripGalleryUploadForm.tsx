import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined'
import { styled, useTheme } from '@mui/material'
import { FC } from 'react'
import Button from 'src/components/Button'
import { useToast } from 'src/hooks'
import { ITripImage } from 'src/types'

import TripImageCard from './TripImageCard'

export interface ITripGalleryUploadFormProps {
  gallery: ITripImage[]
  handleChangeTripGallery: (tripGallery: ITripImage[]) => void
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

export const TripGalleryUploadForm: FC<ITripGalleryUploadFormProps> = ({
  gallery,
  handleChangeTripGallery
}) => {
  const theme = useTheme()
  const { showToast } = useToast()

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      const newTripGallery = [...gallery]

      await Promise.all(
        files.map(async (file) => {
          const imageDataUrl = (await readFile(file)) as string
          newTripGallery.push({
            src: imageDataUrl,
            backgroundInfo: ''
          })
        })
      ).catch((err) => {
        showToast({
          type: 'error',
          message: err.response?.data
        })
      })

      handleChangeTripGallery(newTripGallery)
    }
  }

  const handleChangeTripImage = (index: number, tripImage: ITripImage) => {
    handleChangeTripGallery(
      gallery.map((ti, i) => (i === index ? tripImage : ti))
    )
  }

  const handleRemoveTripImage = (index: number) => {
    handleChangeTripGallery(gallery.filter((_, i) => i !== index))
  }

  const handleChangeDescription = (index: number, description: string) => {
    handleChangeTripGallery(
      gallery.map((ti, i) =>
        i === index ? { ...ti, backgroundInfo: description } : ti
      )
    )
  }

  return (
    <div className="flex flex-col">
      <span className="font-bold text-lg leading-6 mb-1">Trip Gallery</span>
      <span className="text-xs leading-4 text-green-500 mb-3">
        Upload a maximum of 5 photos now. After saving, you can upload an
        unlimited number in your Trip Gallery link
      </span>
      {gallery.length > 0 ? (
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-4">
            {gallery?.map((tripImage, index) => (
              <TripImageCard
                key={index}
                tripImage={tripImage}
                handleChangeTripImage={(tripImage) =>
                  handleChangeTripImage(index, tripImage)
                }
                handleRemoveTripImage={() => handleRemoveTripImage(index)}
                handleChangeDescription={(description: string) =>
                  handleChangeDescription(index, description)
                }
              />
            ))}
          </div>
          <label htmlFor="File-Upload-Travel-Log-Trip-Gallery">
            <Input
              id="File-Upload-Travel-Log-Trip-Gallery"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              multiple
            />
            <div>
              <Button
                component="span"
                buttonLabel="Add Next"
                variant="outlined"
                buttonFontBold
                buttonLeftIconName="ButtonPicture"
                sx={{
                  width: 150,
                  padding: '10px 14px',
                  justifyContent: 'flex-start'
                }}
              />
            </div>
          </label>
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
