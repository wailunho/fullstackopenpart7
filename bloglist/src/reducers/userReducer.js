import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setErrorNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    remove() {
      return null
    }
  }
})

const { set, remove } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const session = window.localStorage.getItem('user')
    if (session) {
      const u = JSON.parse(session)
      dispatch(set(u))
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(set(user))
    } catch (e) {
      console.log('something here?')
      dispatch(setErrorNotification('Wrong credentials', 5000))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('user')
    dispatch(remove())
  }
}

export default userSlice.reducer
