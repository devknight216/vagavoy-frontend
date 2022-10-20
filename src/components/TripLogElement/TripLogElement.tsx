import { Typography } from '@mui/material'
import { FC, memo } from 'react'
import { TripButton } from 'src/components'
import { ITripLog } from 'src/types'

export interface ITripLogElementProps extends ITripLog {}

const getPeriod = (startDate: Date | null, endDate: Date | null) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  if (startDate && endDate) {
    let period = months[startDate.getMonth() - 1] + ' ' + startDate.getDay()

    if (startDate.getFullYear() === endDate.getFullYear()) period += '-'
    else period += ', ' + startDate.getFullYear() + '-'

    if (
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth()
    )
      period += ''
    else period += months[endDate.getMonth() - 1] + ' '

    period += endDate.getDate() + ', ' + endDate.getFullYear()

    return period
  }
  return ''
}

export const TripLogElement: FC<ITripLogElementProps> = memo(
  ({
    tripCountryCode,
    tripLocation,
    tripStartDate,
    tripEndDate,
    tripDescription,
    ...props
  }: ITripLogElementProps) => {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

    return (
      <div
        className="flex flex-col relative sm:pl-[46px] pl-9 pb-8 w-full border-l border-dashed border-l-green-700 last:border-transparent"
        {...props}>
        <div className="absolute w-[24px] h-[24px] sm:-left-3 -left-3 rounded-full bg-green-700 border-[6px] border-white" />
        <div className="flex flex-col sm:mt-0 -mt-[6px]">
          <Typography className="font-bold text-lg leading-6 text-green-700">
            {tripLocation + ', ' + regionNames.of(tripCountryCode)}
          </Typography>
          <Typography className="font-bold text-[14px] leading-[21px] text-green-500 -mt-[2px]">
            {getPeriod(tripStartDate, tripEndDate)}
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
