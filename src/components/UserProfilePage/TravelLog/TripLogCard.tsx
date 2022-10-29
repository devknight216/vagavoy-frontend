import Typography from '@mui/material/Typography'
import { FC, memo, useState } from 'react'
import Flag from 'react-world-flags'
import { useAuth } from 'src/hooks'
import { ITripLog } from 'src/types'

import { TripLogElement } from './TripLogElement'

export interface ITripLogCardProps {
  userId: string
  tripLogCardCountryCode: string
  tripLogs?: ITripLog[]
}

export const TripLogCard: FC<ITripLogCardProps> = memo(
  ({ userId, tripLogCardCountryCode, tripLogs = [] }: ITripLogCardProps) => {
    const [showAllLogs, setShowAllLogs] = useState(false)
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    const { user } = useAuth()

    return (
      <div className="flex flex-col border-b border-b-green-100 sm:pt-8 pt-4 sm:pl-8 pl-5 showBottomBorder last:border-none relative">
        <Flag
          code={tripLogCardCountryCode}
          className="absolute sm:w-[64px] sm:h-[44px] w-[44px] h-[31px] sm:left-0 sm:top-8 z-10 left-0 top-[14px]"
        />
        <div>
          {tripLogs
            .slice(0, showAllLogs ? undefined : 1)
            .map((tripLog, index) => (
              <TripLogElement
                key={index}
                userId={userId}
                tripLog={tripLog}
                isFirstTripLog={index === 0}
              />
            ))}
        </div>
        {!showAllLogs && tripLogs.length > 1 && (
          <div
            className="cursor-pointer sm:pl-[46px] pl-9 mb-5"
            onClick={() => setShowAllLogs(true)}>
            <Typography className="text-lg font-bold leading-6 text-green-700">
              {`See all ${
                user.userProfile?.mainInfo.name.split(' ')[0]
              }'s Stops In ${regionNames.of(tripLogCardCountryCode)}...`}
            </Typography>
          </div>
        )}
      </div>
    )
  }
)

TripLogCard.displayName = 'TripLogCard'

export default TripLogCard
