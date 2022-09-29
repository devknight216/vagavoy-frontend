/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactComponent as Home } from './home.svg'
import { ReactComponent as Pencil } from './pencil.svg'
import { ReactComponent as Picture } from './picture.svg'
import { ReactComponent as Share } from './share.svg'
import { ReactComponent as Users } from './users.svg'

interface IIcon {
  [key: string]: any | undefined
}

const RawIcons: IIcon = {
  Home,
  Pencil,
  Picture,
  Share,
  Users
}

export default RawIcons
