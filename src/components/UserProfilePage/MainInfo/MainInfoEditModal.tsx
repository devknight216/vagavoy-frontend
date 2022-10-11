import { Dialog, Paper, styled } from '@mui/material'
import { FC, memo } from 'react'
import { Button, CloseButton, TextField } from 'src/components'

export interface IMainInfoEditModalProps {
  open: boolean
  onClose: () => void
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

export const MainInfoEditModal: FC<IMainInfoEditModalProps> = memo(
  ({ open, onClose }: IMainInfoEditModalProps) => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={StyledPaper}
        fullWidth
        maxWidth="sm">
        <div className="flex flex-row items-center justify-between sm:h-[88px] h-[72px] sm:px-8 px-4 border-b border-green-100">
          <span className="sm:text-[28px] text-[22px] sm:font-semibold font-bold">
            Edit Info
          </span>
          <div className="flex flex-row-reverse">
            <CloseButton onClose={onClose} />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 p-8 items-end">
          <TextField label="Full Name" placeholder="Enter your full name" />
          <TextField
            label="Currently In"
            placeholder="Enter your current location"
          />
          <TextField
            label="Last Trip"
            placeholder="Enter your last trip location"
          />
          <TextField
            label="Next Spot on Bucket List"
            placeholder="Enter your next spot"
          />
          <Button
            buttonLabel="Save"
            variant="contained"
            className="w-[100px] mt-[100px]"
            onClick={onClose}
          />
        </div>
      </Dialog>
    )
  }
)

MainInfoEditModal.displayName = 'MainInfoEditModal'

export default MainInfoEditModal
