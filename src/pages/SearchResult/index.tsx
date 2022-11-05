import { memo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Avatar, Button, Icon } from 'src/components'
import MainContainer from 'src/components/MainContainer'
import { axiosInstance } from 'src/services/jwtService'
import { IProfile } from 'src/types'

export const SearchResult = memo(() => {
  const [search] = useSearchParams()
  const [results, setResults] = useState<IProfile[]>([])

  useEffect(() => {
    const term = search.get('term')

    axiosInstance
      .post('/user/search', { searchKey: term })
      .then((res) => {
        setResults(res.data)
      })
      .catch((err) => console.log(err))
  }, [search])

  return (
    <MainContainer className="w-full min-h-[calc(100vh-80px)]">
      <div className="flex flex-col sm:gap-y-9 gap-y-8 w-full h-full mt-8 xl:px-6 items-start">
        <span className="text-[28px] font-semibold leading-6">
          Search Results
        </span>
        <div className="flex flex-col gap-y-4 sm:gap-y-6 w-full">
          {results.length > 0 ? (
            results.map((profile, index) => (
              <div
                key={profile.id || index}
                className="flex sm:flex-row flex-col gap-x-6 relative w-full">
                <Avatar
                  src={profile.profileImage}
                  className="sm:w-[92px] sm:h-[92px] w-[42px] h-[42px] sm:block hidden"
                  borderWidth={2}
                />
                <div className="flex flex-1 flex-col gap-y-4 items-start border-b border-b-green-100 pb-6">
                  <div className="flex flex-row gap-x-3 items-center justify-center">
                    <Avatar
                      src={profile.profileImage}
                      className="sm:w-[92px] sm:h-[92px] w-[42px] h-[42px] sm:hidden block"
                      borderWidth={2}
                    />
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
                  <Button
                    buttonLabel="Connect"
                    variant="contained"
                    className="sm:w-[124px] sm:h-[44px] w-[90px] h-[32px] sm:absolute top-0 right-0"
                  />
                </div>
              </div>
            ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-8">
              No Result
            </span>
          )}
        </div>
      </div>
    </MainContainer>
  )
})

SearchResult.displayName = 'SearchResult'

export default SearchResult
