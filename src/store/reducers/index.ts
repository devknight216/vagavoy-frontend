import { combineReducers } from '@reduxjs/toolkit'

import account from './accountSlice'
import tripGallery from './tripGallerySlice'
import tripLogs from './tripLogsSlice'

const reducer = combineReducers({
  account,
  tripGallery,
  tripLogs
})

export default reducer
