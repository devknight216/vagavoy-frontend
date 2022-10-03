import { styled, Typography } from '@mui/material'
import { FC, memo } from 'react'
import { TripButton } from 'src/components'

export interface ITripLogContainerProps {
  /**
   * Trip Log Image Source
   */
  tripLogImageSource?: string
  /**
   * Trip Location
   */
  tripLocation: string
  /**
   * Trip Period
   */
  tripPeriod: string
  /**
   * Trip Description
   */
  tripDescription: string
  /**
   * Show Border
   */
  showBorder?: boolean
}

const Container = styled('div', {
  shouldForwardProp: (propName) => propName !== 'showBorder'
})<{ showBorder: boolean }>(({ theme, showBorder }) => ({
  width: '100%',
  borderLeft: showBorder ? `1px dashed ${theme.palette.green.dark}` : 'none'
}))

export const TripLogContainer: FC<ITripLogContainerProps> = memo(
  ({
    tripLogImageSource,
    tripLocation,
    tripPeriod,
    tripDescription,
    showBorder = false,
    ...props
  }: ITripLogContainerProps) => {
    return (
      <Container
        showBorder={showBorder}
        className="flex flex-col relative sm:pl-[46px] pl-9 pb-8"
        {...props}>
        {tripLogImageSource ? (
          <img
            src={tripLogImageSource}
            className="absolute sm:w-[64px] sm:h-[44px] w-[44px] h-[31px] sm:-left-8 -left-[22px] -top-[2px]"
          />
        ) : (
          <div className="absolute w-[24px] h-[24px] sm:-left-3 -left-3 rounded-full bg-green-700 border-[6px] border-white" />
        )}
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
      </Container>
    )
  }
)

TripLogContainer.displayName = 'TripLogContainer'

export default TripLogContainer
