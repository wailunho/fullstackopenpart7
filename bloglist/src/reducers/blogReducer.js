import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
    }
  }
})

const { set, remove, add, update } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(set(blogs))
  }
}

export const addBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({
      title,
      author,
      url
    })
    dispatch(add(newBlog))
  }
}

export const updateBlog = (id, data) => {
  return async (dispatch) => {
    await blogService.update(id, data)
    dispatch(update({ id, data }))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(remove(id))
  }
}

export const setToken = (token) => {
  return async () => {
    blogService.setToken(token)
  }
}

export default blogSlice.reducer
