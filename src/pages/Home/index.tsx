import { Typography, useTheme } from '@mui/material'
import { memo } from 'react'
import { Button, Logo } from 'src/components'

export const Home = memo(() => {
  const theme = useTheme()

  return (
    <div className="w-full flex flex-col">
      <div className="w-full relative">
        <img
          src="/images/homebanner.png"
          className="w-full sm:h-auto h-[396px] object-cover object-[70%_90%]"
        />
        <img
          src="/images/homebannerback.png"
          className="h-auto w-11/12 sm:w-2/3 xl:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="w-full relative">
        <img
          src="/images/footerbanner.png"
          className="w-full h-[374px] object-cover object-[50%_100%]"
        />
        <div className="flex flex-col gap-y-8 items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Typography variant="h3" sx={{ color: 'white' }}>
            Discover, Explore, Record.
          </Typography>
          <Button
            sx={{ width: 132 }}
            variant="contained"
            buttonLabel="Join Now"
            buttonFontBold={true}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-[106px] mt-2 relative">
        <Logo sx={{ position: 'absolute', top: '-27px' }} />
        <Typography sx={{ fontSize: 12, color: theme.palette.green.middle, fontFamily: 'sans_pro' }}>
          © 2022 All rights reserved
        </Typography>
      </div>
    </div>
  )
})

Home.displayName = 'Home'

export default Home
