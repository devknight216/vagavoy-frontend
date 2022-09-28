import React from 'react'
import { ReactComponent as Home } from './home.svg'
import { ReactComponent as Users } from './users.svg'

interface IIcon {
  [key: string]: any | undefined
}

const RawIcons: IIcon = {
  Home,
  Users
}

export default RawIcons
