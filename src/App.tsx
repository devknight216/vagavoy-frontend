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
import { Login } from './pages'

function App() {
  const { theme } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/" element={<AppLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
