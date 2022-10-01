import { Share } from '@mui/icons-material'
import React from 'react'
import { Avatar, Button, Icon } from 'src/components'
import MainContainer from 'src/components/MainContainer'
const UserProfile: React.FC = () => (
  <div>
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
    </MainContainer>
  </div>
)

export default UserProfile
