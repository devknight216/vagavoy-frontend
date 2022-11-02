import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { axiosInstance } from 'src/services/jwtService'
import { IProfile } from 'src/types'

const initialState: IProfile = {}

export const setProfileImage = createAsyncThunk(
  'account/setProfileImage',
  async ({
    userId,
    profileImage
  }: {
    userId: string
    profileImage: string
  }) => {
    return await axiosInstance
      .put(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        profileImage
      })
      .then(() => {
        return profileImage
      })
      .catch((err: AxiosError) => {
        console.log(err.message)
      })
  }
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
