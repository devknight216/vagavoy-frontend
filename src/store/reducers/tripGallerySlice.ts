import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'
import { ITripImage } from 'src/types'

import { RootState } from '../store'

export const fetchGallery = createAsyncThunk(
  'account/fetchGallery',
  async () => {
    return []
  }
)

export const saveGalleryOnDB = createAsyncThunk(
  'account/saveGalleryOnDB',
  async (data: ITripImage[]) => {
    return data === undefined ? [] : data
  }
)

const tripGalleryAdapter = createEntityAdapter<ITripImage>({
  selectId: (tripImage) => tripImage.tripImageId
})

const tripGallerySlice = createSlice({
  name: 'tripGallery',
  initialState: tripGalleryAdapter.getInitialState({}),
  reducers: {
    addTripImage: tripGalleryAdapter.addOne
  },
  extraReducers: {
    [fetchGallery.fulfilled.toString()]: tripGalleryAdapter.setAll,
    [saveGalleryOnDB.fulfilled.toString()]: (_state, action) => action.payload
  }
})

export const tripGallerySelectors = tripGalleryAdapter.getSelectors<RootState>(
  (state) => state.tripGallery
)

export const { addTripImage } = tripGallerySlice.actions

export default tripGallerySlice.reducer
