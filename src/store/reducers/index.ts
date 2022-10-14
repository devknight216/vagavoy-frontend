import { combineReducers } from '@reduxjs/toolkit'

import account from './accountSlice'

const reducer = combineReducers({
  account
})

export default reducer
