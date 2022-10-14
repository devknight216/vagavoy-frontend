import { Dialog, Paper, styled } from '@mui/material'
import { FC, memo, useState } from 'react'
import { Button, CloseButton, TextField } from 'src/components'
import { setPrimaryProfile } from 'src/store/reducers/accountSlice'
import { useAppDispatch } from 'src/store/store'
import { IProfile } from 'src/types'

export interface IAboutEditModalProps {
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

export const AboutEditModal: FC<IAboutEditModalProps> = memo(
  ({ open, onClose, primaryProfile }: IAboutEditModalProps) => {
    const CHARACTER_LIMIT = 2600
    const dispatch = useAppDispatch()
    const [bio, setBio] = useState(primaryProfile?.bio || '')

    const handleSaveButtonClick = async () => {
      await dispatch(
        setPrimaryProfile({
          bio
        })
      )
      onClose()
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
            Add About
          </span>
          <div className="flex flex-row-reverse">
            <CloseButton onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col gap-y-8 p-8 items-end">
          <TextField
            value={bio}
            multiline={true}
            placeholder="Write a litte bit about yourself here (e.g., your favorite kinds of travel, who you travel with, what you do when you're not travelling, etc."
            onChange={(e) => setBio(e.target.value)}
            rows={12}
            helperText={`${bio.length}/${CHARACTER_LIMIT}`}
            inputProps={{ maxLength: CHARACTER_LIMIT }}
          />
          <Button
            buttonLabel="Save"
            variant="contained"
            className="w-[100px]"
            onClick={handleSaveButtonClick}
          />
        </div>
      </Dialog>
    )
  }
)

AboutEditModal.displayName = 'AboutEditModal'

export default AboutEditModal
