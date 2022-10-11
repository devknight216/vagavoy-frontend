import {
  Box,
  InputAdornment as MuiInputAdornment,
  styled,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps
} from '@mui/material'
import Typography from '@mui/material/Typography'
import { FC, memo } from 'react'

import { Icon } from '../index'

export type ITextFieldProps = MuiTextFieldProps & {
  textFieldWidth?: number
  textFieldHeight?: number
  textFieldLeftIconName?: string
  textFieldOverflow?: boolean
  textFieldMaxLength?: number
}

const CustomTextField = styled(MuiTextField, {
  shouldForwardProp: (propName) =>
    propName !== 'textFieldWidth' && propName !== 'textFieldHeight'
})<ITextFieldProps>(({ theme, textFieldWidth, textFieldHeight }) => ({
  width: textFieldWidth === 0 ? '100%' : textFieldWidth,
  '& .MuiOutlinedInput-root': {
    padding: theme.spacing(0, 3),
    minHeight: textFieldHeight,
    position: 'relative',

    '& .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.palette.green.light1}`
    },

    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: `1px solid ${theme.palette.green.light1}`
      }
    },

    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: `1px solid ${theme.palette.green.light1}`
      }
    }
  },

  '& .MuiOutlinedInput-input': {
    fontFamily: 'proxima_nova',
    fontSize: '14px',
    fontWeight: 400,
    fontStyle: 'normal',
    lineHeight: '24px',
    color: theme.palette.green.dark,
    padding: '0px',

    '&::placeholder': {
      color: theme.palette.green.middle,
      opacity: 1
    }
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.green.light1
  }
}))

const TextFieldContainer = styled(Box, {
  shouldForwardProp: (propName) => propName !== 'width'
})<{ width: number | undefined }>((props) => ({
  width: props.width ? props.width : '100%',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '8px'
}))

// const CustomTypography = styled(MuiTypography, {
//   shouldForwardProp: (propName) => propName !== 'disabled'
// })<{ disabled: boolean }>(() => ({
//   // color: disabled
//   //   ? theme.palette.typography.disabled
//   //   : theme.palette.typography.primary,
//   fontFamily: 'Inter',
//   letterSpacing: '0.1px'
// }))

// const MaxLetter = styled(MuiTypography)(() => ({
//   // color: theme.palette.typography.secondary,
//   position: 'absolute',
//   right: 0
// }))

export const TextField: FC<ITextFieldProps> = memo(
  ({
    textFieldWidth,
    textFieldHeight = 44,
    textFieldLeftIconName,
    label,
    value,
    multiline,
    placeholder,
    disabled,
    textFieldOverflow,
    // textFieldMaxLength,
    sx,
    ...props
  }: ITextFieldProps) => {
    return (
      <TextFieldContainer width={textFieldWidth}>
        <Box>
          <Typography className='text-sm leading-[21px] text-green-500 ml-[2px]'>
            {label}
          </Typography>
        </Box>
        <CustomTextField
          {...props}
          sx={sx}
          variant="outlined"
          textFieldWidth={textFieldWidth}
          textFieldHeight={multiline ? undefined : textFieldHeight}
          multiline={multiline}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          InputProps={{
            ...props.InputProps,
            startAdornment:
              props.InputProps?.startAdornment ||
              (textFieldLeftIconName && (
                <MuiInputAdornment position="start">
                  <Icon
                    iconName={textFieldLeftIconName}
                    iconSize={20}
                    tabIndex={-1}
                  />
                </MuiInputAdornment>
              ))
          }}
          InputLabelProps={{
            ...props.InputLabelProps,
            shrink: true
          }}
          minRows={4}
          maxRows={textFieldOverflow ? 4 : undefined}
        />
      </TextFieldContainer>
    )
  }
)

TextField.displayName = 'TextField'

export default TextField
