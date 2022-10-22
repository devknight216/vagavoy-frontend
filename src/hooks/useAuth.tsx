/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from 'react'

import jwtService from '../services/jwtService'

const authContext = createContext<any>({
  isAuthorized: false,
  checkingAuthorization: false,
  user: {},
  setUser: () => {},
  signin: () => {},
  signout: () => {}
})

export interface LayoutProps {
  children: React.ReactNode
}

export function ProvideAuth({ children }: LayoutProps) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [user, setUser] = useState({})
  const [checkingAuthorization, setCheckingAuthorization] = useState(true)

  const signin = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      jwtService
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          setIsAuthorized(true)
          resolve(res)
        })
        .catch((err) => {
          setIsAuthorized(false)
          reject(err)
        })
    })
  }

  const signout = () => {
    jwtService.logout()
    setIsAuthorized(false)
  }

  useEffect(() => {
    jwtService.on('onAutoLogin', (value: boolean) => {
      setIsAuthorized(value)
      setCheckingAuthorization(false)
    })
    jwtService.on('userInfo', (value) => setUser(value))
    jwtService.on('onAutoLogout', () => {
      setIsAuthorized(false)
    })

    jwtService.handleAuthentication()

    return () => {
      jwtService.removeListener('onAutoLogin')
      jwtService.removeListener('onAutoLogout')
    }
  }, [])

  return {
    isAuthorized,
    checkingAuthorization,
    user,
    setUser,
    signin,
    signout
  }
}
