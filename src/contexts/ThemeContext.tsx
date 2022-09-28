import { createTheme } from '@mui/material/styles'
import React from 'react'

import { breakpoints, palette } from '../constants'

export const themes = {
  light: createTheme({
    breakpoints: {
      values: breakpoints
    },
    palette: palette.light,
    spacing: 4
  }),
  dark: createTheme({
    breakpoints: {
      values: breakpoints
    },
    palette: palette.dark,
    spacing: 4
  })
}

const themeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {}
})

function useProvideTheme() {
  const [theme, setTheme] = React.useState(themes.light)

  const toggleTheme = () => {
    if (theme === themes.light) setTheme(themes.dark)
    else setTheme(themes.light)
  }

  return {
    theme,
    toggleTheme
  }
}

export function ProvideTheme({ children }: any) {
  const theme = useProvideTheme()
  return <themeContext.Provider value={theme}>{children}</themeContext.Provider>
}

export const useTheme = () => React.useContext(themeContext)
