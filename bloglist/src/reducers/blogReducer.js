import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import {
  setErrorNotification,
  setSuccessNotification
} from './notificationReducer'

const getSortedBlogsByLikes = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    set(state, action) {
      return getSortedBlogsByLikes(action.payload)
    },
    remove(state, action) {
      return getSortedBlogsByLikes(state.filter((x) => x.id !== action.payload))
    },
    add(state, action) {
      return getSortedBlogsByLikes([...state, action.payload])
    },
    update(state, action) {
      return getSortedBlogsByLikes(
        state.map((x) => (x.id === action.payload.id ? action.payload.data : x))
      )
    },
    addComment(state, action) {
      return state.map((x) =>
        x.id === action.payload.id
          ? { ...x, comments: [action.payload.comment, ...x.comments] }
          : x
      )
    }
  }
})

const { set, remove, add, update, addComment } = blogSlice.actions

const handleError = (dispatch, e) => {
  if (e.response && e.response.data && e.response.data.error) {
    dispatch(setErrorNotification(e.response.data.error, 5000))
  } else {
    dispatch(setErrorNotification(e.message, 5000))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(set(blogs))
  }
}

export const addBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url
      })
      dispatch(add(newBlog))
      dispatch(
        setSuccessNotification(`a new blog ${title} by ${author} added`, 5000)
      )
    } catch (e) {
      handleError(dispatch, e)
    }
  }
}

export const updateBlog = (id, data) => {
  return async (dispatch) => {
    try {
      await blogService.update(id, data)
      dispatch(update({ id, data }))
    } catch (e) {
      handleError(dispatch, e)
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(remove(id))
    } catch (e) {
      handleError(dispatch, e)
    }
  }
}

export const addBlogComment = (id, comment) => {
  return async (dispatch) => {
    try {
      await blogService.addComment(id, comment)
      dispatch(addComment({ id, comment }))
    } catch (e) {
      handleError(dispatch, e)
    }
  }
}

export const setToken = (token) => {
  return async () => {
    blogService.setToken(token)
  }
}

export default blogSlice.reducer
