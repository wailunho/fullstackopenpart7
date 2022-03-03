import { setErrorNotification } from '../reducers/notificationReducer'
import { updateBlog } from '../reducers/blogReducer'

export const handleError = (dispatch, e) => {
  return () => {
    if (e.response && e.response.data && e.response.data.error) {
      dispatch(setErrorNotification(e.response.data.error, 5000))
    } else {
      dispatch(setErrorNotification(e.message, 5000))
    }
  }
}

export const handleLike = (dispatch, blog) => {
  return async (e) => {
    e.preventDefault()
    try {
      const id = blog.id
      const newObj = { ...blog, likes: blog.likes + 1 }
      dispatch(updateBlog(id, newObj))
    } catch (e) {
      handleError(dispatch, e)
    }
  }
}
