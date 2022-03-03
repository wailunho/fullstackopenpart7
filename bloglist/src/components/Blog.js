import { useState } from 'react'
import PropTypes from 'prop-types'
import { setErrorNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const Blog = ({ blog, currentUser }) => {
  const dispatch = useDispatch()
  const [isShown, setIsShown] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleError = (e) => {
    if (e.response && e.response.data && e.response.data.error) {
      dispatch(setErrorNotification(e.response.data.error, 5000))
    } else {
      dispatch(setErrorNotification(e.message, 5000))
    }
  }

  const handleLike = (blog) => {
    return async (e) => {
      e.preventDefault()
      try {
        const id = blog.id
        const newObj = { ...blog, likes: blog.likes + 1 }
        dispatch(updateBlog(id, newObj))
      } catch (e) {
        handleError(e)
      }
    }
  }

  const handleDelete = (blog) => {
    return async (e) => {
      e.preventDefault()
      try {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
          dispatch(removeBlog(blog.id))
        }
      } catch (e) {
        handleError(e)
      }
    }
  }

  const handleToggleView = () => {
    setIsShown(!isShown)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="blog-title-and-author">
        {blog.title} {blog.author}
      </div>
      <button type="button" onClick={handleToggleView}>
        {isShown ? 'hide' : 'view'}
      </button>
      <div className="blog-detail" style={{ display: isShown ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button className="blog-like-btn" onClick={handleLike(blog)}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <div
          style={{
            display: currentUser.username === blog.user.username ? '' : 'none'
          }}
        >
          <button onClick={handleDelete(blog)}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default Blog
