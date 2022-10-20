import { ITripImage } from './ITripImage'

export interface ITripLogBase {
  tripCountryCode: string
  tripLocation?: string
  tripStartDate: Date
  tripEndDate: Date
  tripDescription?: string
  tripGallery?: ITripImage[]
}

export interface ITripLog extends ITripLogBase {
  tripLogId: number
}
