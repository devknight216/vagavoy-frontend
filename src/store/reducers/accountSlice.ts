import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IMainInfo, IProfile } from 'src/types'

const initialState: IProfile = {
  mainInfo: {
    firstName: 'Charlie',
    lastName: 'Hummel'
  }
}

export const setMainInfo = createAsyncThunk(
  'account/setMainInfo',
  async (mainInfo: IMainInfo) => mainInfo
)

export const setAbout = createAsyncThunk(
  'account/setAbout',
  async (about: string | undefined) => about
)

export const setProfileImage = createAsyncThunk(
  'account/setProfileImage',
  async (profileImage: string) => profileImage
)

export const setBannerImage = createAsyncThunk(
  'account/setBannerImage',
  async (bannerImage: string) => bannerImage
)

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: {
    [setMainInfo.fulfilled.toString()]: (state, action) => {
      state.mainInfo = action.payload
    },
    [setAbout.fulfilled.toString()]: (state, action) => {
      state.about = action.payload
    },
    [setProfileImage.fulfilled.toString()]: (state, action) => {
      state.profileImage = action.payload
    },
    [setBannerImage.fulfilled.toString()]: (state, action) => {
      state.bannerImage = action.payload
    }
  }
})

export default accountSlice.reducer
