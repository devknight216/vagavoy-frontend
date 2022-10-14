import { Close } from '@mui/icons-material'
import {
  Checkbox,
  Dialog,
  DialogProps,
  FormControlLabel,
  IconButton,
  Paper,
  styled,
  useTheme
} from '@mui/material'
import React from 'react'

import Button from '../Button'
import TextField from '../TextField'

interface SignUpModalProps extends DialogProps {
  onClose: () => void
}

const BorderButton = styled(IconButton)`
  border: 1px solid var(--var-green-light1);
  color: black;
`

const StyledPaper = styled(Paper)`
  flex-direction: row !important;
  border-radius: 16px;
  max-width: 980px !important;
  width: 100%;
  @media (max-width: 1199px) {
    max-width: 575px !important;
  }
`

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose }) => {
  const theme = useTheme()
  return (
    <Dialog open={open} onClose={() => onClose()} PaperComponent={StyledPaper}>
      <img
        src="/images/login.jpg"
        className="w-[480px] h-auto hidden xl:block"
      />
      <div className="max-w-[575px] w-full px-4 pt-5 xl:pl-[60px] sm:pr-8 min-h-[500px] mb-16">
        <div className="flex flex-row-reverse">
          <BorderButton
            className="w-8 h-8 sm:w-11 sm:h-11"
            onClick={() => onClose()}>
            <Close />
          </BorderButton>
        </div>
        <div className="xl:pr-20 flex flex-col items-center mx-auto max-w-[320px] xl:max-w-none w-full">
          <span className="text-[28px] font-semibold py-5">
            Welcome To Vagavoy!
          </span>
          <div className="items-start w-full mb-4">
            <div className="text-[14px] text-green-500 mb-1.5">Full Name</div>
            <TextField textFieldHeight={44} fullWidth />
          </div>
          <div className="items-start w-full mb-4">
            <div className="text-[14px] text-green-500 mb-1.5">Email</div>
            <TextField textFieldHeight={44} fullWidth />
          </div>
          <div className="items-start w-full mb-4">
            <div className="text-[14px] text-green-500 pb-1.5">Pasword</div>
            <TextField textFieldHeight={44} type="password" fullWidth />
          </div>
          <div className="items-start mb-4">
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: theme.palette.green.dark,
                    '&.Mui-checked': {
                      color: theme.palette.green.dark
                    }
                  }}
                />
              }
              label="I accept the User Agreement"
            />
          </div>
          <Button fullWidth variant="contained" buttonLabel="Sign In" />
        </div>
      </div>
    </Dialog>
  )
}

export default SignUpModal
