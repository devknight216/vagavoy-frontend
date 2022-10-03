import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { styled } from '@mui/material'
import { FC, memo } from 'react'

import Icon from '../Icon'
export interface ITripButtonProps {
  tripButtonType?: 'Gallery' | 'Recommendation'
  tripButtonTitle: string
  tripButtonDescription: string
  onClick?: () => void
}

const StyledDiv = styled('div')(({ theme }) => ({
  width: 'calc(100% - 105px)',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 58px)'
  }
}))

export const TripButton: FC<ITripButtonProps> = memo(
  ({
    tripButtonType = 'Gallery',
    tripButtonTitle,
    tripButtonDescription
  }: ITripButtonProps) => {
    return (
      <div className="md:w-1/2 bg-[#e5e8db] bg-opacity-20 sm:h-[70px] h-[47px] rounded-lg w-full border border-green-100 p-2 pr-3 flex md:justify-between items-center max-w-[381px]">
        {tripButtonType === 'Gallery' ? (
          <img
            src="/images/trip-image.png"
            className="md:mr-3 mr-2 sm:w-[69px] sm:h-[54px] w-[50px] h-[39px]"
          />
        ) : (
          <div className="flex md:mr-3 mr-2 sm:w-[69px] sm:h-[54px] w-[50px] h-[39px] md:min-w-[69px] min-w-[50px] bg-green-300 rounded-lg items-center justify-center">
            <AssignmentOutlinedIcon className="sm:w-[37px] sm:h-[37px] w-[22px] h-[22px]" />
          </div>
        )}
        <StyledDiv>
          <div className="font-bold text-green-700 text-[14px] w-full truncate">
            {tripButtonTitle}
          </div>
          <div className="text-green-700 text-[14px] w-full truncate">
            {tripButtonDescription}
          </div>
        </StyledDiv>
        <Icon iconName="Next" iconSize={24} className="hidden md:block" />
      </div>
    )
  }
)

TripButton.displayName = 'TripButton'

export default TripButton
