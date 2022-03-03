import { createSlice } from '@reduxjs/toolkit'

const NOTIFICATION_TYPE_SUCCESS = 'success'
const NOTIFICATION_TYPE_ERROR = 'error'

const initialState = {
  type: NOTIFICATION_TYPE_SUCCESS,
  message: ''
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return { message: action.payload.message, type: action.payload.type }
    },
    removeNotification(state) {
      return { ...state, message: '' }
    }
  }
})

const { changeNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, timeout, type) => {
  return async (dispatch) => {
    dispatch(changeNotification({ message, type }))
    setTimeout(() => dispatch(removeNotification()), timeout)
  }
}

export const setSuccessNotification = (message, timeout) => {
  return setNotification(message, timeout, NOTIFICATION_TYPE_SUCCESS)
}

export const setErrorNotification = (message, timeout) => {
  console.log(13213)
  return setNotification(message, timeout, NOTIFICATION_TYPE_ERROR)
}
export default notificationSlice.reducer
