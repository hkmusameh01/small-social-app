import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      console.log(action.payload)
      state.push(...action.payload)
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export default notificationsSlice.reducer

export const selectAllNotifications = (state) => state.notifications
