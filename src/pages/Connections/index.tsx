import { AxiosResponse } from 'axios'
import { memo, useEffect, useState } from 'react'
import { UserCard } from 'src/components'
import MainContainer from 'src/components/MainContainer'
import UserConnectContainer from 'src/components/UserConnectContainer'
import { useAuth } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { IProfile } from 'src/types'

interface ConnectionResponse {
  connectedUsers: IProfile[]
  recommendedUsers: IProfile[]
  requestedUsers: IProfile[]
}

export const Connections = memo(() => {
  const [connectedUsers, setConnectedUsers] = useState<IProfile[]>([])
  const [recommendedUsers, setRecommendedUsers] = useState<IProfile[]>([])
  const [requestedUsers, setRequestedUsers] = useState<IProfile[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const userId = user.id
    if (userId) {
      axiosInstance
        .get('/connection')
        .then((res: AxiosResponse<ConnectionResponse>) => {
          setConnectedUsers(res.data.connectedUsers)
          setRequestedUsers(res.data.requestedUsers)
          setRecommendedUsers(res.data.recommendedUsers)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  return (
    <MainContainer className="w-full min-h-[calc(100vh-80px)]">
      <div className="flex flex-col sm:gap-y-9 gap-y-8 w-full h-full mt-8 xl:px-6 items-start">
        <span className="text-[28px] font-semibold leading-6">
          Connection Requests
        </span>
        <div className="flex flex-col gap-y-4 sm:gap-y-6 w-full">
          {connectedUsers && connectedUsers.length > 0 ? (
            connectedUsers.map((profile, index) => (
              <UserConnectContainer
                key={index}
                profile={profile || []}
                type="request"
              />
            ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-4 mb-4">
              No Pending Connections
            </span>
          )}
        </div>

        <span className="text-[28px] font-semibold leading-6">
          Recommended Connections
        </span>

        <div className="flex flex-wrap w-full mb-8">
          {recommendedUsers && recommendedUsers.length > 0 ? (
            recommendedUsers
              .filter((r) => r._id !== user.id)
              .map((profile, index) => (
                <div
                  key={index}
                  className="flex flex-wrap md:w-1/4 sm:w-1/3 w-1/2">
                  <div className="w-full p-2">
                    <UserCard
                      key={profile?._id || index}
                      userProfile={profile || []}
                      showConnectButton={true}
                    />
                  </div>
                </div>
              ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-4 mb-4 w-full">
              No Recommended Connections
            </span>
          )}
        </div>

        <span className="text-[28px] font-semibold leading-6">
          Existing Connections
        </span>
        <div className="flex flex-col gap-y-4 sm:gap-y-6 w-full mb-8">
          {requestedUsers && requestedUsers.length > 0 ? (
            requestedUsers.map((profile, index) => (
              <UserConnectContainer
                key={profile?._id || index}
                profile={profile || []}
                type="existing"
              />
            ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-4 mb-4">
              No Existing Connections
            </span>
          )}
        </div>
      </div>
    </MainContainer>
  )
})

Connections.displayName = 'Connections'

export default Connections
