import './App.css'

import { ThemeProvider } from '@mui/material/styles'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import { AppLayout } from '../src/components'
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
            <Route path="/" element={<AppLayout />}>
              <Route path="/user-profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
