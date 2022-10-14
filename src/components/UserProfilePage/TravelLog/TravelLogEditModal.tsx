/* eslint-disable @typescript-eslint/no-unused-vars */
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined'
import { Dialog, Paper, styled, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import { FC, memo, useState } from 'react'
import { Button, Checkbox, CloseButton, Icon, TextField } from 'src/components'
import { setPrimaryProfile } from 'src/store/reducers/accountSlice'
import { useAppDispatch } from 'src/store/store'
import { IProfile } from 'src/types'

export interface ITravelLogEditModalProps {
  open: boolean
  onClose: () => void
  primaryProfile: IProfile
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

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

export const TravelLogEditModal: FC<ITravelLogEditModalProps> = memo(
  ({ open, onClose, primaryProfile }: ITravelLogEditModalProps) => {
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const [flagImage, setFlagImage] = useState('')
    const [tripDescription, setTripDescription] = useState('')

    const handleSaveButtonClick = async () => {
      await dispatch(setPrimaryProfile(primaryProfile))
      onClose()
    }

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        const imageDataUrl = (await readFile(file)) as string
        setFlagImage(imageDataUrl)
      }
    }

    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={StyledPaper}
        fullWidth
        maxWidth="sm">
        <div className="flex flex-row items-center justify-between sm:h-[88px] h-[72px] sm:px-8 px-4 border-b border-green-100">
          <span className="sm:text-[28px] text-[22px] sm:font-semibold font-bold">
            Add New Travel
          </span>
          <div className="flex flex-row-reverse">
            <CloseButton onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col p-8">
          {/** Image Upload */}
          <div className="ml-1 flex flex-row gap-x-3 items-center sm:mb-6 mb-4">
            <div className="w-[64px] h-[44px] bg-green-100">
              {flagImage ? (
                <img src={flagImage} className="w-full" />
              ) : (
                <label htmlFor="File-Upload-Travel-Log-Flag-Image">
                  <Input
                    id="File-Upload-Travel-Log-Flag-Image"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                  />
                  <div className="flex flex-col items-center justify-center cursor-pointer">
                    <Icon
                      iconName="Picture"
                      iconSize={44}
                      iconColor={theme.palette.green.middle}
                    />
                  </div>
                </label>
              )}
            </div>
            <Typography className="font-bold text-lg leading-6 text-green-700">
              Add Flag
            </Typography>
          </div>

          {/** Trip Information Input */}
          <div className="flex flex-col gap-y-4 sm:mb-2 mb-4">
            <TextField label="Trip Location" placeholder="Add Location" />
            <TextField
              label="Trip Start Date"
              placeholder="Select Starting Date"
            />
            <TextField
              label="Trip Description"
              multiline={true}
              placeholder="Trip Description"
              rows={5}
              onChange={(e) => setTripDescription(e.target.value)}
              helperText={`${tripDescription.length}/2600`}
              inputProps={{ maxLength: 2600 }}
            />
          </div>

          {/** Trip Gallery */}
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-6 mb-1">
              Trip Gallery
            </span>
            <span className="text-xs leading-4 text-green-500 mb-3">
              Upload a maximum of 5 photos now. After saving, you can upload an
              unlimited number in your Trip Gallery link
            </span>
            <div className="flex flex-col gap-y-1 h-[117px] bg-green-100 rounded-lg items-center justify-center">
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
          </div>

          {/** Trip Recommendations */}
          <div className="flex flex-col gap-y-4 sm:mt-10 mt-8 text-lg leading-6 font-bold">
            <span>Trip Recommendations</span>
            <TextField label="Section Title" placeholder="Select a Section" />
            <TextField
              label="Information"
              multiline={true}
              placeholder="Write some things you want to remember and / or tips that could help other travellers"
              rows={5}
            />
            <Button
              buttonLabel="Add Next"
              variant="outlined"
              buttonFontBold
              buttonLeftIconName="Pencil"
              sx={{
                width: 150,
                padding: '10px 14px',
                justifyContent: 'flex-start'
              }}
            />
          </div>

          {/** Agreement */}
          <div className="flex flex-col mt-6">
            <span className="font-bold text-sm leading-6 text-green-700 mb-2">
              Do you want to notify your connections about this trip now? You
              can come back and do this at any time
            </span>
            <Checkbox checkboxLabel="Yes" />
          </div>

          {/** Save Button */}
          <div className="flex justify-between items-center mt-8">
            <span
              className="font-bold text-lg leading-6 text-green-500 cursor-pointer"
              onClick={handleSaveButtonClick}>
              Delete Trip
            </span>
            <Button
              buttonLabel="Save"
              variant="contained"
              className="w-[100px]"
              onClick={handleSaveButtonClick}
            />
          </div>
        </div>
      </Dialog>
    )
  }
)

TravelLogEditModal.displayName = 'TravelLogEditModal'

export default TravelLogEditModal
