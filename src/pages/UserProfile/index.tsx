import { Share } from '@mui/icons-material'
import React from 'react'
import { Avatar, Button, Icon } from 'src/components'
import MainContainer from 'src/components/MainContainer'
import TripButton from 'src/components/TripButton'
const UserProfile: React.FC = () => (
  <div className='w-full'>
    <img
      src="/images/user-profile-wallpaper.jpg"
      className="w-full min-h-[100px] h-auto sm:h-[300px] object-cover object-[100%_50%]"
    />
    <MainContainer className="">
      <Avatar
        src="https://mui.com/static/images/avatar/2.jpg"
        className="rounded-full w-[92px] sm:w-[260px] border-[4px] sm:border-[8px] -mt-[46px] sm:-mt-[180px]"
      />
      <div className="px-1 xl:px-3 pt-3 sm:pt-8">
        <div className="flex flex-row justify-between items-end text-green-700">
          <span className="text-[18px] sm:text-[24px] font-bold">
            Charlie Hummel
          </span>
          <span className="text-[14px] sm:text-[22px] font-normal sm:font-bold">
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
              <span className="ml-2 text-[18px] text-green-500">
                Currently In:
              </span>
              <span className="ml-2 text-[18px] text-green-700 font-bold">
                Saint Louis, MO
              </span>
            </div>
            <div className="flex flex-row items-center mt-4">
              <Icon
                iconName="Airplane"
                iconColor="var(--var-green-light1)"
                iconSize={22}
              />
              <span className="ml-2 text-[18px] text-green-500">
                Last Trip:
              </span>
              <span className="ml-2 text-[18px] text-green-700 font-bold">
                Utila, Honduras
              </span>
            </div>
            <div className="flex flex-row items-center mt-4">
              <Icon
                iconName="Map"
                iconColor="var(--var-green-light1)"
                iconSize={22}
              />
              <span className="ml-2 text-[18px] text-green-500">
                Next Spot On Bucket List:
              </span>
              <span className="ml-2 text-[18px] text-green-700 font-bold">
                Colombia
              </span>
            </div>
          </div>
          <div className="mt-3 sm:mt-0 flex flex-col items-end w-full sm:w-min">
            <span className="w-full sm:w-[158px]">
              <Button
                buttonLabel="Share Profile"
                variant="outlined"
                buttonFontBold
                endIcon={<Share />}
                fullWidth
              />
            </span>
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
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col mt-4 sm:mt-6 w-full text-left px-[31px] py-10 bg-green-100 rounded-[16px]">
          <span className="mb-7 sm:text-[28px] text-[24px] text-black font-bold font-700 sm:font-600">
            About
          </span>
          <span className="text-[16px]">
            My favorite kind of travel is adventure travel. I like to go
            off-the-beaten path when I can to explore places and meet people
            that aren't used to tourists. When I'm in a new city, I avoid taxis
            and try to do everything either on-foot, by bike or using public
            transport. Back home, I work as a management consultant which gives
            me nice chunks of time between projects to travel and means I spend
            another 100+ nights / year away from home just for work.
          </span>
        </div>
        <div className="flex flex-col mt-4 sm:mt-8 mb-[74px] sm:mb-[155px] text-left py-4 sm:py-[42px] px-4 sm:px-8 rounded-[16px] border-[1px]">
          <span className="sm:text-[28px] text-[24px] text-black font-bold font-700 sm:font-600">
            Travel Log
          </span>
          <div className="flex flex-row  sm:mt-8 mt-4">
            <img src="/images/ar-flag.jpg" className="sm:w-[64px] sm:h-[44px] w-[44px] h-[31px]" />
            <div className="flex flex-col ml-3">
              <span className="sm:text-[18px] text-[14px] font-bold text-green-700">
                Utila, Honduras
              </span>
              <span className="text-[14px] font-400 text-green-500">
                Mar 20-27, 2022
              </span>
              <div className="mt-3 sm:text-base text-sm">
                I learned to scuba dive in high school and did my open water
                certification dive at an old rock quarry in the middle of
                Missouri. Although I wanted to, I hadn't been scuba diving again
                since. But finally, six years later I got to go again - but this
                time in Utila, in one of the biggest reefs in the world!
              </div>
              <div className="mt-4 flex flex-col sm:flex-row">
                <TripButton type="1" onClick={()=>{}}></TripButton>
                <TripButton type="2" onClick={() => {}}></TripButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  </div>
)

export default UserProfile
