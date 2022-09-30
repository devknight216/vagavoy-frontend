import './App.css'

import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import { useTheme } from './contexts'
import { UserProfile } from './pages'

function App() {
  const { theme } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/user-profile" />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
