import { Close } from '@mui/icons-material'
import { Dialog, DialogProps, IconButton, Paper, styled, TextField } from '@mui/material'
import React from 'react'

interface LoginModalProps extends DialogProps {
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
  @media (max-width: 1023px) {
    max-width: 575px !important;
  }
`

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => (
  <Dialog open={open} onClose={() => onClose()} PaperComponent={StyledPaper}>
    <img src="/images/login.jpg" className="w-[480px] h-auto hidden lg:block" />
    <div className="max-w-[575px] w-full pl-[60px] pt-5 pr-8 min-h-[500px]">
      <div className="flex flex-row-reverse">
        <BorderButton
          className="w-8 h-8 sm:w-11 sm:h-11"
          onClick={() => onClose()}>
          <Close />
        </BorderButton>
      </div>
      <div className="lg:pr-20 flex flex-col items-center">
        <span className="text-[28px] font-bold py-5">Welcome Back!</span>
        <div className="items-start w-full">
          <div className="text-[14px] text-green-middle">Email</div>
          <TextField fullWidth />
        </div>
      </div>
    </div>
  </Dialog>
)

export default LoginModal
