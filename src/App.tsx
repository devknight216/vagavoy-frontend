import './App.css'

import { ThemeProvider } from '@mui/material/styles'
import {
  BrowserRouter as Router,
  // Navigate,
  Route,
  Routes
} from 'react-router-dom'

import { AppLayout } from '../src/components'
import { useTheme } from './contexts'
import { ScrollToTop } from './hooks'
import { Home, UserProfile } from './pages'

function App() {
  const { theme } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/user-profile" element={<UserProfile />} />
              </Route>
            </Routes>
          </ScrollToTop>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
