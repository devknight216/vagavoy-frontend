/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactComponent as Airplane } from './airplane.svg'
import { ReactComponent as Close } from './close.svg'
import { ReactComponent as Document } from './document.svg'
import { ReactComponent as Hamburger } from './hamburger.svg'
import { ReactComponent as Home } from './home.svg'
import { ReactComponent as Join } from './join.svg'
import { ReactComponent as Location } from './location.svg'
import { ReactComponent as Map } from './map.svg'
import { ReactComponent as Message } from './message.svg'
import { ReactComponent as Next } from './next.svg'
import { ReactComponent as Pencil } from './pencil.svg'
import { ReactComponent as Picture } from './picture.svg'
import { ReactComponent as Search } from './search.svg'
import { ReactComponent as Share } from './share.svg'
import { ReactComponent as Upload } from './upload.svg'
import { ReactComponent as User } from './user.svg'
import { ReactComponent as Users } from './users.svg'

interface IIcon {
  [key: string]: any | undefined
}

const RawIcons: IIcon = {
  Airplane,
  Close,
  Document,
  Hamburger,
  Home,
  Join,
  Location,
  Map,
  Message,
  Next,
  Pencil,
  Picture,
  Search,
  Share,
  Upload,
  User,
  Users
}

export default RawIcons
