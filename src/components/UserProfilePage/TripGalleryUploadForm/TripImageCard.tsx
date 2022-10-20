/* eslint-disable @typescript-eslint/no-unused-vars */
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined'
import { styled, Typography, useTheme } from '@mui/material'
import { FC, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Icon, TextField } from 'src/components'
import { fetchGallery } from 'src/store/reducers/tripGallerySlice'
import { RootState, useAppDispatch } from 'src/store/store'
import { ITripImage } from 'src/types'

export interface ITripImageCardProps {
  tripImage: ITripImage
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

export const TripImageCard: FC<ITripImageCardProps> = memo(
  ({ tripImage }: ITripImageCardProps) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [backgroundInfo, setBackgroundInfo] = useState(
      tripImage.backgroundInfo
    )

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        console.log(file)
        const imageDataUrl = (await readFile(file)) as string
      }
    }

    return (
      <div className="flex sm:flex-row flex-col gap-x-6 gap-y-4">
        <img
          src={tripImage.src}
          className="sm:w-[150px] sm:h-[117px] w-[82px] h-[79px]"
        />
        <div className="w-full flex flex-col gap-y-2 sm:justify-center">
          <span className="text-sm leading-[21px] text-green-500">
            Background Info
          </span>
          <TextField
            rows={3}
            value={backgroundInfo}
            multiline={true}
            placeholder="Background Information"
            onChange={(e) => setBackgroundInfo(e.target.value)}
          />
        </div>
      </div>
    )
  }
)

TripImageCard.displayName = 'TripImageCard'

export default TripImageCard
