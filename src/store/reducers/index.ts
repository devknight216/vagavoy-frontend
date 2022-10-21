import { combineReducers } from '@reduxjs/toolkit'

import account from './accountSlice'
import tripLogs from './tripLogsSlice'

const reducer = combineReducers({
  account,
  tripLogs
})

export default reducer
