import './App.css'

import { ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  // Navigate,
  Route,
  Routes
} from 'react-router-dom'

import { AppLayout } from '../src/components'
import { useTheme } from './contexts'
import { ScrollToTop } from './hooks'
import { ProvideAuth } from './hooks/useAuth'
import { Home, UserProfile } from './pages'
import { store } from './store/store'

function App() {
  const { theme } = useTheme()

  return (
    <ProvideAuth>
      <Provider store={store}>
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
      </Provider>
    </ProvideAuth>
  )
}

export default App
