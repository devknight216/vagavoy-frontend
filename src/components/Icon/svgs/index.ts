/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactComponent as Close } from './close.svg'
import { ReactComponent as Hamburger } from './hamburger.svg'
import { ReactComponent as Home } from './home.svg'
import { ReactComponent as Join } from './join.svg'
import { ReactComponent as Pencil } from './pencil.svg'
import { ReactComponent as Picture } from './picture.svg'
import { ReactComponent as Search } from './search.svg'
import { ReactComponent as Share } from './share.svg'
import { ReactComponent as Users } from './users.svg'

interface IIcon {
  [key: string]: any | undefined
}

const RawIcons: IIcon = {
  Close,
  Hamburger,
  Home,
  Join,
  Pencil,
  Picture,
  Search,
  Share,
  Users
}

export default RawIcons