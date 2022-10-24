import { ITripImage } from './ITripImage'
import { ITripRecommendation } from './ITripRecommendation'

export interface ITripLogBase {
  tripCountryCode?: string
  tripLocation?: string
  tripStartDate: Date
  tripEndDate: Date
  tripDescription?: string
  tripGallery?: ITripImage[]
  tripRecommendations?: ITripRecommendation[]
}

export interface ITripLog extends ITripLogBase {
  tripLogId?: string
}
