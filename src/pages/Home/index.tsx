import { memo } from 'react'

export const Home = memo(() => {
  return (
    <div className='w-full'>
      <img src="/images/homebanner.png" className="w-full sm:h-auto h-[396px] object-cover object-[100%_90%]" />
    </div> 
  )
})

Home.displayName = 'Home'

export default Home
