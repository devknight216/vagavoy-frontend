import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { axiosInstance } from 'src/services/jwtService'
import { IMainInfo, IProfile } from 'src/types'

const initialState: IProfile = {}

export const setMainInfo = createAsyncThunk(
  'account/setMainInfo',
  async ({ userId, mainInfo }: { userId: string; mainInfo: IMainInfo }) => {
    return await axiosInstance
      .put(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        name: mainInfo.name,
        currentlyIn: mainInfo.location,
        lastTrip: mainInfo.lastTripLocation,
        nextSpot: mainInfo.nextSpotOnBucketList
      })
      .then((res) => {
        console.log(res.data)
        return mainInfo
      })
      .catch((err: AxiosError) => {
        console.log(err.message)
      })
  }
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
