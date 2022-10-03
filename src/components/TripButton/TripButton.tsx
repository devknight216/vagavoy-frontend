import { alpha, styled, useTheme } from '@mui/material'
import { memo } from 'react'

import Icon from '../Icon'

interface TripButtonProps{
  type?: string
  onClick: () => void
}
const TripButtonDiv = styled('div')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.green.light2, 0.2),
  borderRadius: '8px',
  borderColor: theme.palette.green.light2,
  borderWidth: '1px',
  borderStyle: 'solid',
}))
const TripButton: React.FC<TripButtonProps> = memo(( {type} ) => {
  const theme = useTheme()  
  if(type==="1")
  return(
    <TripButtonDiv className="flex flex-row items-center mr-[14px]" onClick={() => {}}>
      <img src="/images/trip-image.png" className="sm:m-2 m-1 sm:w-[69px] sm:h-[54px] w-[50px] h-[39px]" />
      <div className='flex flex-col m-1'>
        <span className='font-bold text-sm'>
          Trip Gallery
        </span>
        <span className='text-sm'>
          Pictures and videos from my trip
        </span>
      </div>
      <Icon
        iconName="Next"
        iconColor={theme.palette.green.dark}
        className="ml-7 mr-3"
      />
    </TripButtonDiv>
  )
  return(
    <TripButtonDiv className="flex flex-row items-center" onClick={() => {}}>
      <img src="/images/trip-image.png" className="sm:m-2 m-1 sm:w-[69px] sm:h-[54px] w-[50px] h-[39px]" />
      <div className='flex flex-col m-1'>
        <span className='font-bold text-sm'>
          Trip Recommendations
        </span>
        <span className='text-sm'>
          Some of the more nitty-gritty details...
        </span>
      </div>
      <Icon
        iconName="Next"
        iconColor={theme.palette.green.dark}
        className="ml-7 mr-3"
      />
    </TripButtonDiv>
  )
})

export default TripButton