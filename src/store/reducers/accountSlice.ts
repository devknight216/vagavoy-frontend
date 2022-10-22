import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IMainInfo, IProfile } from 'src/types'

const initialState: IProfile = {}

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
  reducers: {
    updateProfile: (state, action) => action.payload
  },
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

export const { updateProfile } = accountSlice.actions

export default accountSlice.reducer
