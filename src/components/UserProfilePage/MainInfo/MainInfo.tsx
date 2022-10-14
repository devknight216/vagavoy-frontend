import { FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, EditButton, Icon } from 'src/components'
import { RootState } from 'src/store/store'
import { IProfile } from 'src/types'

import MainInfoEditModal from './MainInfoEditModal'

export interface IMainInfoProps {
  /**
   * User Information
   */
  user?: IProfile
  /**
   * Current User
   */
  currentUser?: boolean
}

export const MainInfo: FC<IMainInfoProps> = memo(
  ({ currentUser = true }: IMainInfoProps) => {
    const [openAboutModal, setOpenAboutModal] = useState(false)
    const primaryProfile = useSelector((state: RootState) => state.account)

    return (
      <div className="relative">
        <div className="flex flex-row justify-between items-end text-green-700">
          <span className="text-lg sm:text-[24px] font-bold">
            {primaryProfile?.firstName + ' ' + primaryProfile?.lastName}
          </span>
          <span className="text-sm sm:text-[22px] font-normal sm:font-bold">
            500+ Connections
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between mt-3 sm:mt-4">
          <div className="mt-0.5">
            <div className="flex flex-row items-center">
              <Icon
                iconName="Location"
                iconColor="var(--var-green-light1)"
                iconSize={22}
              />
              <span className="ml-2 sm:text-lg text-sm text-green-500">
                Currently In:
              </span>
              <span className="ml-2 sm:text-lg text-sm text-green-700 font-bold">
                {primaryProfile?.location}
              </span>
            </div>
            <div className="flex flex-row items-center mt-4">
              <Icon
                iconName="Airplane"
                iconColor="var(--var-green-light1)"
                iconSize={22}
              />
              <span className="ml-2 sm:text-lg text-sm text-green-500">
                Last Trip:
              </span>
              <span className="ml-2 sm:text-lg text-sm text-green-700 font-bold">
                {primaryProfile?.lastTripLocation}
              </span>
            </div>
            <div className="flex flex-row items-center mt-4">
              <Icon
                iconName="Map"
                iconColor="var(--var-green-light1)"
                iconSize={22}
              />
              <span className="ml-2 sm:text-lg text-sm text-green-500">
                Next Spot On Bucket List:
              </span>
              <span className="ml-2 sm:text-lg text-sm text-green-700 font-bold">
                {primaryProfile?.nextSpotOnBucketList}
              </span>
            </div>
          </div>
          <div className="mt-3 sm:mt-0 flex flex-col items-end w-full sm:w-min">
            <span className="w-full sm:w-[158px]">
              <Button
                buttonLabel="Share Profile"
                variant="outlined"
                buttonFontBold
                buttonRightIconName="Share"
                fullWidth
              />
            </span>
            {!currentUser && (
              <div className="mt-4 sm:mt-[18px] flex flex-row w-full">
                <span className="mr-5 sm:mr-6 w-full sm:w-min">
                  <Button
                    buttonLabel="Message"
                    variant="outlined"
                    className="w-full sm:w-[124px]"
                  />
                </span>
                <Button
                  buttonLabel="Connect"
                  variant="contained"
                  className="w-full sm:w-[124px]"
                />
              </div>
            )}
          </div>
        </div>
        {currentUser && (
          <div className="flex-col items-center justify-center cursor-pointer absolute sm:-top-[76px] -top-[42px] right-0">
            <EditButton onClick={() => setOpenAboutModal(true)} />
          </div>
        )}
        <MainInfoEditModal
          open={openAboutModal}
          onClose={() => setOpenAboutModal(false)}
          primaryProfile={primaryProfile}
        />
      </div>
    )
  }
)

MainInfo.displayName = 'MainInfo'

export default MainInfo
