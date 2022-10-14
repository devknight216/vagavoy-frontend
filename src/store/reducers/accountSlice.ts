import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProfile } from 'src/types'

const initialState: IProfile = {
  firstName: 'Charlie',
  lastName: 'Hummel',
  // bio: 'My favorite kind of travel is adventure travel. I like to go off-the-beaten path when I can to explore places and meet people that aren’t used to tourists. When I’m in a new city, I avoid taxis and try to do everything either on-foot, by bike or using public transport. Back home, I work as a management consultant which gives me nice chunks of time between projects to travel and means I spend another 100+ nights / year away from home just for work.',
  bio: ''
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
