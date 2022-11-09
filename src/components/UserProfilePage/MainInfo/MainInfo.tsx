import { AxiosError } from 'axios'
import { FC, memo, useEffect, useState } from 'react'
import { Button, EditButton, Icon } from 'src/components'
import { useAuth, useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { IMainInfo } from 'src/types'

import MainInfoEditModal from './MainInfoEditModal'

export interface IMainInfoProps {
  id: string
}

export const MainInfo: FC<IMainInfoProps> = memo(({ id }: IMainInfoProps) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [userMainInfo, setUserMainInfo] = useState<IMainInfo>({})
  const { user } = useAuth()
  const currentUser = id === user.id
  const { showToast } = useToast()

  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/user/${id}`)
      .then((res) => {
        setUserMainInfo({
          name: res.data.mainInfo.name,
          location: res.data.mainInfo.location,
          lastTripLocation: res.data.mainInfo.lastTripLocation,
          nextSpotOnBucketList: res.data.mainInfo.nextSpotOnBucketList
        })
      })
      .catch((err: AxiosError) => {
        showToast({
          type: 'error',
          message: err.response?.data
        })
      })
  }, [id])

  const handleSaveMainInfo = (mainInfo: IMainInfo) => {
    axiosInstance
      .put(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        mainInfo: {
          name: mainInfo.name,
          location: mainInfo.location,
          lastTripLocation: mainInfo.lastTripLocation,
          nextSpotOnBucketList: mainInfo.nextSpotOnBucketList
        }
      })
      .then(() => {
        setUserMainInfo(mainInfo)
      })
      .catch((err: AxiosError) => {
        showToast({
          type: 'error',
          message: err.response?.data
        })
      })
  }

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-end text-green-700">
        <span className="text-lg sm:text-[24px] font-bold">
          {userMainInfo.name}
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
              {userMainInfo?.location?.split(',')[0]}
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
              {userMainInfo?.lastTripLocation?.split(',')[0]}
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
              {userMainInfo?.nextSpotOnBucketList?.split(',')[0]}
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
          <EditButton onClick={() => setOpenEditModal(true)} />
        </div>
      )}
      <MainInfoEditModal
        open={openEditModal}
        mainInfo={userMainInfo}
        userId={id || ''}
        onClose={() => setOpenEditModal(false)}
        handleSaveMainInfo={handleSaveMainInfo}
      />
    </div>
  )
})

MainInfo.displayName = 'MainInfo'

export default MainInfo
