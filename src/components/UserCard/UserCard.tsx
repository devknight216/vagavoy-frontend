import { Typography, useTheme } from '@mui/material'
import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProfile } from 'src/types/IProfile'

import { Avatar } from '../index'

export interface IUserCardProps {
  /**
   * User Information
   */
  userProfile: IProfile
  /**
   * Show Connect Button?
   */
  showConnectButton?: boolean
}

export const UserCard: FC<IUserCardProps> = memo(
  ({ userProfile }: IUserCardProps) => {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
      <div
        className="rounded-2xl relative flex items-center flex-col shadow-3xl bg-white pb-[51px] cursor-pointer"
        onClick={() => navigate('/user-profile')}>
        <img
          src={userProfile.bannerImage}
          className="w-full sm:h-[145px] h-[96px] rounded-2xl rounded-br-none rounded-bl-sm border-[1px] border-green-100"
        />
        <div className="absolute top-[38px] sm:top-[99px] mx:auto">
          <Avatar size={92} src={userProfile.profileImage} borderWidth={4} />
        </div>
        <div className="mt-[50px] sm:mt-[62px] flex flex-col gap-y-2">
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 18,
              lineHeight: '24px',
              color: theme.palette.green.dark
            }}>
            {userProfile.mainInfo?.name}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 18,
              lineHeight: '24px',
              color: theme.palette.green.middle
            }}>
            Last Trip: {userProfile.mainInfo?.lastTripLocation}
          </Typography>
        </div>
      </div>
    )
  }
)

UserCard.displayName = 'UserCard'

export default UserCard
