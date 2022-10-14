import { Typography } from '@mui/material'
import { FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Icon } from 'src/components'
import { RootState } from 'src/store/store'

import TravelLogEditModal from './TravelLogEditModal'

export interface ITravelLogProps {
  /**
   * Current User
   */
  currentUser?: boolean
}

// const tripLogs1 = [
//   {
//     tripLocation: 'Utila, Honduras',
//     tripPeriod: 'Mar 20-27, 2022',
//     tripDescription:
//       'I learned to scuba dive in high school and did my open water certification dive at an old rock quarry in the middle of Missouri. Although I wanted to,     I hadn’t been scuba diving again since. But finally, six years later I got to go again – but this time in Utila, in one of the biggest reefs in the world!'
//   }
// ]

// const tripLogs2 = [
//   {
//     tripLocation: 'Egypt',
//     tripPeriod: 'Jan 14-Apr 14,2021',
//     tripDescription:
//       'Went backpacking in Egypt with a friend for three months after I graduated and before starting work. It was during at the height of COVID and all the hotels were all nearly empty. We went north-south-east and west in the country and did it all for <$25 / day everything included!'
//   },
//   {
//     tripLocation: 'Dahab, Egypt',
//     tripPeriod: 'Jan 14-Apr 14,2021',
//     tripDescription:
//       'Went backpacking in Egypt with a friend for three months after I graduated and before starting work. It was during at the height of COVID and all the hotels were all nearly empty. We went north-south-east and west in the country and did it all for <$25 / day everything included!'
//   },
//   {
//     tripLocation: 'Western Desert, Egypt',
//     tripPeriod: 'Jan 14-Apr 14,2021',
//     tripDescription:
//       'Went backpacking in Egypt with a friend for three months after I graduated and before starting work. It was during at the height of COVID and all the hotels were all nearly empty. We went north-south-east and west in the country and did it all for <$25 / day everything included!'
//   }
// ]

export const TravelLog: FC<ITravelLogProps> = memo(
  ({ currentUser = true }: ITravelLogProps) => {
    const [openEditModal, setOpenEditModal] = useState(false)
    const primaryProfile = useSelector((state: RootState) => state.account)

    return (
      <div className="flex flex-col mt-4 sm:mt-8 sm:mb-16 mb-12 text-left py-4 sm:py-[42px] px-4 sm:px-8 rounded-[16px] border-[1px]">
        <Typography className="sm:text-[28px] text-[18px] leading-6 text-black font-bold font-700 sm:font-600 ml-1">
          Travel Log
        </Typography>
        {currentUser ? (
          <>
            <div className="flex flex-1 flex-col gap-y-4 justify-center items-center">
              <Icon
                iconName="Travel"
                className="sm:w-[44px] sm:h-[44px] w-6 h-6"
              />
              <Typography className="font-bold text-lg leading-6 text-green-700 text-center">
                Share your travels
              </Typography>
              <Button
                variant="contained"
                buttonLabel="Add Info"
                onClick={() => setOpenEditModal(true)}
                sx={{ width: 124 }}
              />
            </div>
            <TravelLogEditModal
              open={openEditModal}
              onClose={() => setOpenEditModal(false)}
              primaryProfile={primaryProfile}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    )
  }
)

TravelLog.displayName = 'TravelLog'

export default TravelLog
