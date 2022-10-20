export interface IMainInfo {
  firstName?: string
  lastName?: string
  location?: string
  lastTripLocation?: string
  nextSpotOnBucketList?: string
}
export interface IProfile {
  id?: number
  mainInfo?: IMainInfo
  profileImage?: string
  bannerImage?: string
  about?: string
}
