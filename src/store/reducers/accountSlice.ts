import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProfile } from 'src/types'

const initialState: IProfile = {
  firstName: 'Charlie',
  lastName: 'Hummel'
}

export const setPrimaryProfile = createAsyncThunk(
  'account/setPrimaryProfile',
  async (data: IProfile) => {
    return data === undefined ? initialState : data
  }
)

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: {
    [setPrimaryProfile.fulfilled.toString()]: (_state, action) => action.payload
  }
})

export default accountSlice.reducer
