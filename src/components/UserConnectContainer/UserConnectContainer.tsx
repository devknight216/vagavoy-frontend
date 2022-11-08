import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProfile } from 'src/types/IProfile'

import { Avatar, Button, Icon } from '../index'

export interface IUserConnectContainerProps {
  profile: IProfile
  type: 'request' | 'existing' | 'search'
}

export const UserConnectContainer: FC<IUserConnectContainerProps> = memo(
  ({ profile, type }: IUserConnectContainerProps) => {
    const navigate = useNavigate()

    return (
      <div
        className="flex sm:flex-row flex-col gap-x-6 relative w-full cursor-pointer"
        onClick={() => navigate(`/profile/${profile._id}`)}>
        {profile.profileImage ? (
          <Avatar
            src={profile.profileImage}
            className="sm:w-[92px] sm:h-[92px] w-[42px] h-[42px] sm:block hidden"
            borderWidth={2}
          />
        ) : (
          <AccountCircleOutlinedIcon className="text-green-700 w-[92px] h-[92px] sm:block hidden" />
        )}

        <div className="flex flex-1 flex-col gap-y-4 items-start border-b border-b-green-100 pb-6">
          <div className="flex flex-row gap-x-3 items-center justify-center">
            {profile.profileImage ? (
              <Avatar
                src={profile.profileImage}
                className="sm:w-[92px] sm:h-[92px] w-[42px] h-[42px] sm:hidden block"
                borderWidth={2}
              />
            ) : (
              <AccountCircleOutlinedIcon className="text-green-700 w-[92px] h-[92px] sm:hidden block" />
            )}

            <span className="text-[22px] leading-6 font-bold text-green-700">
              {profile.mainInfo?.name}
            </span>
          </div>
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
              {profile.mainInfo?.location}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <Icon
              iconName="Airplane"
              iconColor="var(--var-green-light1)"
              iconSize={22}
            />
            <span className="ml-2 sm:text-lg text-sm text-green-500">
              Last Trip:
            </span>
            <span className="ml-2 sm:text-lg text-sm text-green-700 font-bold">
              {profile.mainInfo?.lastTripLocation}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <Icon
              iconName="Map"
              iconColor="var(--var-green-light1)"
              iconSize={22}
            />
            <span className="ml-2 sm:text-lg text-sm text-green-500">
              Next Spot On Bucket List:
            </span>
            <span className="ml-2 sm:text-lg text-sm text-green-700 font-bold">
              {profile.mainInfo?.nextSpotOnBucketList}
            </span>
          </div>
          <div className="flex flex-row gap-x-[30px] sm:absolute top-0 right-0">
            {type === 'request' ? (
              <>
                <Button
                  buttonLabel="Reject"
                  variant="outlined"
                  className="sm:w-[124px] sm:h-[44px] w-[90px] h-[32px] border-green-500 text-green-500"
                />
                <Button
                  buttonLabel="Accept"
                  variant="outlined"
                  className="sm:w-[124px] sm:h-[44px] w-[90px] h-[32px]"
                />
              </>
            ) : type === 'existing' ? (
              <>
                <Button
                  buttonLabel="Remove"
                  variant="outlined"
                  className="sm:w-[124px] sm:h-[44px] w-[90px] h-[32px] border-green-500 text-green-500"
                />
                <Button
                  buttonLabel="Message"
                  variant="outlined"
                  className="sm:w-[124px] sm:h-[44px] w-[90px] h-[32px]"
                />
              </>
            ) : type === 'search' ? (
              <Button
                buttonLabel="Connect"
                variant="contained"
                className="sm:w-[124px] sm:h-[44px] w-[90px] h-[32px]"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    )
  }
)

UserConnectContainer.displayName = 'UserConnectContainer'

export default UserConnectContainer
