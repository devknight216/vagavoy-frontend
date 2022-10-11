import { Dialog, DialogProps, Paper, styled } from '@mui/material'
import React from 'react'
import { Button, CloseButton, Divider, TextField } from 'src/components'

interface AboutModalProps extends DialogProps {
  onClose: () => void
}

const StyledPaper = styled(Paper)`
  flex-direction: col !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
`

const StyledTextArea = styled(TextField)`
  textarea {
    padding: 12px !important;
  }
  p {
    margin-left: auto;
  }
`

const AboutModal: React.FC<AboutModalProps> = ({ open, onClose }) => {
  const CHARACTER_LIMIT = 2600
  const [name, setName] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      PaperComponent={StyledPaper}
      fullWidth
      maxWidth="sm">
      <div className="flex flex-row justify-between mx-8 my-[22px]">
        <span className="sm:text-[28px] text-[22px] font-bold py-[10px]">
          Edit About
        </span>
        <div className="flex flex-row-reverse">
          <CloseButton onClose={onClose} />
        </div>
      </div>
      <Divider></Divider>
      <div className="p-8">
        <StyledTextArea
          inputProps={{ maxlength: CHARACTER_LIMIT }}
          multiline={true}
          value={name}
          rows={8}
          helperText={`${name.length}/${CHARACTER_LIMIT}`}
          onChange={handleChange}
          placeholder="Write a litte bit about yourself here (e.g., your favorite kinds of travel, who you travel with, what you do when you're not travelling, etc."
          className="rounded-[16px]"
        />
      </div>
      <div className="flex flex-row justify-end py-8">
        <Button
          variant="contained"
          buttonLabel="Save"
          className="mr-8 w-[99px]"></Button>
      </div>
    </Dialog>
  )
}
export default AboutModal
