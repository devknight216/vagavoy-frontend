import { Typography } from '@mui/material'
import { FC, memo } from 'react'
import { TripButton } from 'src/components'
import { ITripLog } from 'src/types'

export interface ITripLogElementProps extends ITripLog {}

export const TripLogElement: FC<ITripLogElementProps> = memo(
  ({
    tripLocation,
    tripPeriod,
    tripDescription,
    ...props
  }: ITripLogElementProps) => {
    return (
      <div
        className="flex flex-col relative sm:pl-[46px] pl-9 pb-8 w-full border-l border-dashed border-l-green-700 last:border-transparent"
        {...props}>
        <div className="absolute w-[24px] h-[24px] sm:-left-3 -left-3 rounded-full bg-green-700 border-[6px] border-white" />
        <div className="flex flex-col sm:mt-0 -mt-[6px]">
          <Typography className="font-bold text-lg leading-6 text-green-700">
            {tripLocation}
          </Typography>
          <Typography className="font-bold text-[14px] leading-[21px] text-green-500 -mt-[2px]">
            {tripPeriod}
          </Typography>
        </div>
        <Typography className="text-base leading-6 text-green-700 mt-3">
          {tripDescription}
        </Typography>
        <div className="mt-4 flex flex-col gap-x-4 md:flex-row gap-y-2">
          <TripButton
            tripButtonType="Gallery"
            tripButtonTitle="Trip Gallery"
            tripButtonDescription="Pictures and videos from my trip"
          />
          <TripButton
            tripButtonType="Recommendation"
            tripButtonTitle="Trip Recommendations"
            tripButtonDescription="Some of the more nitty-gnitty .."
          />
        </div>
      </div>
    )
  }
)

TripLogElement.displayName = 'TripLogElement'

export default TripLogElement
