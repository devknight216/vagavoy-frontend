import React from 'react'
import { Avatar } from 'src/components'
import MainContainer from 'src/components/MainContainer'

const UserProfile: React.FC = () => (
  <div>
    <img src="/images/user-profile-wallpaper.jpg" className="w-full min-h-[100px] h-auto sm:h-[300px] object-cover object-[100%_50%]" />
    <MainContainer className="">
      <Avatar
        src="https://mui.com/static/images/avatar/2.jpg"
        className="rounded-full w-[92px] sm:w-[260px] border-[4px] sm:border-[8px] -mt-[46px] sm:-mt-[180px]"
      />
    </MainContainer>
  </div>
)

export default UserProfile
