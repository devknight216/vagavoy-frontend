import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice
} from '@reduxjs/toolkit'
import { ITripLog, ITripLogBase } from 'src/types'

import { RootState } from '../store'

export const fetchTripLogs = createAsyncThunk(
  'account/fetchGallery',
  async () => {
    return []
  }
)

export const addTripLog = createAsyncThunk(
  'account/addTripLog',
  async (tripLog: ITripLogBase): Promise<ITripLog> => {
    return { ...tripLog, tripLogId: Math.round(Math.random() * 10000) }
  }
)

const tripLogsAdapter = createEntityAdapter<ITripLog>({
  selectId: (tripLog) => tripLog.tripLogId,
  sortComparer: (a, b) =>
    b?.tripStartDate?.getTime() - a?.tripStartDate?.getTime()
})

const tripLogsSlice = createSlice({
  name: 'tripLogs',
  initialState: tripLogsAdapter.getInitialState({
    loading: false
  }),
  reducers: {},
  extraReducers: {
    [addTripLog.pending.toString()]: (state) => {
      state.loading = true
    },
    [addTripLog.fulfilled.toString()]: (state, action) => {
      state.loading = false
      const newState = tripLogsAdapter.addOne(state, action)
      return newState
    }
  }
})

const { selectById } = tripLogsAdapter.getSelectors()

export const getTripLogsState = (rootState: RootState) => rootState.tripLogs

export const selectTripLogEntity = (id: number) => {
  return createSelector(getTripLogsState, (state) => selectById(state, id))
}

export const tripLogsSelectors = tripLogsAdapter.getSelectors<RootState>(
  (state) => state.tripLogs
)

export default tripLogsSlice.reducer
